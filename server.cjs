// 🔴 DIAGNOSTIC BLOCK: Add this at the absolute top of server.cjs
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ CRITICAL CRASH: Unhandled Promise Rejection!');
    console.error('Reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('❌ CRITICAL CRASH: Uncaught Exception thrown!');
    console.error(err.stack || err);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// 🔴 DEBUG LOGGING: Add this to see every incoming request in your terminal
app.use((req, res, next) => {
  console.log(`📡 Incoming Request: ${req.method} ${req.path}`);
  next();
});

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY;
const API_KEY = process.env.API_KEY;
const DASHSCOPE_ENDPOINT = process.env.DASHSCOPE_ENDPOINT
  || 'https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation';

const GITHUB_MODELS_BASE_URL = 'https://models.github.ai/inference';
const GITHUB_MODELS_MODEL = 'gpt-4o-mini';

const AVAILABLE_MODELS = {
  'qwen-image-2.0': 'Qwen Image 2.0',
  'qwen-image-2.0-pro': 'Qwen Image 2.0 Pro',
};

const OUTPUT_SIZES = {
  '1024*1024': '1024×1024 (1:1)',
  '1536*1024': '1536×1024 (3:2)',
  '1024*1536': '1024×1536 (2:3)',
  '1280*720': '1280×720 (16:9)',
  '720*1280': '720×1280 (9:16)',
};

const PRODUCT_SHOT_SUFFIX = 'Product shot, standalone garment, flat lay display, NO people, NO models, NO mannequins, clean studio background.';

if (!DASHSCOPE_API_KEY) {
  console.error('Missing DASHSCOPE_API_KEY in .env');
  process.exit(1);
}

if (!API_KEY) {
  console.error('Missing API_KEY in .env');
  process.exit(1);
}

function bufferToDataUrl(buffer, mimeType) {
  return `data:${mimeType || 'image/jpeg'};base64,${buffer.toString('base64')}`;
}

function parseJsonFromGpt(content) {
  const trimmed = content.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Failed to parse JSON from GPT response');
  }
}

function ensureProductShotSuffix(prompt) {
  const lower = prompt.toLowerCase();
  if (lower.includes('no people') && lower.includes('flat lay')) return prompt;
  return `${prompt.trim().replace(/\.\s*$/, '')}. ${PRODUCT_SHOT_SUFFIX}`;
}

function buildUpcycleSystemPrompt(imageCount) {
  if (imageCount === 1) {
    return `You are an expert sustainable fashion designer and garment upcycling specialist.

The user uploaded ONE clothing/garment image. Your job:
1. Analyze the garment in extreme detail: exact material/fabric type (denim, cotton, lace, silk, etc.), exact colors and shades, patterns, prints, hardware (buttons, zippers), seams, silhouette, length, fit, sleeves, neckline, hem, condition, and every visible construction detail.
2. Generate exactly 3 DIFFERENT wearable upcycling design ideas that transform THIS SAME garment using the SAME material and SAME colors. Do not invent new fabrics or colors.
3. Each idea must be a realistic wearable piece (skirt, dress, blouse, vest, top, trousers, bag, jumpsuit, jacket, etc.) — be creative but grounded in the actual fabric available.
4. For each idea, write a detailed design_description explaining the cutting, restructuring, and sewing steps.
5. For each idea, write an image_prompt for an image-to-image AI model. Start with "Image-to-image garment modification:" then describe the transformation concisely. MUST end with: "${PRODUCT_SHOT_SUFFIX}"

Return ONLY valid JSON (no markdown) in this exact structure:
{
  "mode": "single_garment_redesign",
  "garment_analysis": "Detailed analysis of the single garment...",
  "upcycling_ideas": [
    {
      "id": 1,
      "title": "Short descriptive name",
      "design_description": "Step-by-step transformation description...",
      "image_prompt": "Image-to-image garment modification: ... ${PRODUCT_SHOT_SUFFIX}"
    }
  ]
}

Rules:
- Exactly 3 ideas in upcycling_ideas
- Preserve original material type and colors in every idea
- image_prompt must be actionable for image-to-image editing`;
  }

  return `You are an expert sustainable fashion designer and garment upcycling specialist.

The user uploaded ${imageCount} different clothing/garment images. Your job:
1. Analyze EACH garment separately in extreme detail: exact material/fabric type, exact colors, patterns, hardware, seams, silhouette, length, and all construction details. Identify what each piece contributes (e.g., Piece 1: denim dress, Piece 2: navy lace dress).
2. Generate exactly 3 DIFFERENT creative upcycling design ideas that REMIX and COMBINE materials/elements from ALL uploaded pieces into new wearable garments.
3. Each idea must clearly reference which pieces are used and how their materials are combined (cut, layered, attached, etc.).
4. Each idea must be a realistic wearable piece (skirt, dress, blouse, vest, top, trousers, bag, jumpsuit, etc.).
5. For each idea, write a detailed design_description explaining the cutting, combining, and sewing steps across the pieces.
6. For each idea, write an image_prompt for an image-to-image AI model. Start with "Image-to-image garment modification:" then describe the transformation. MUST end with: "${PRODUCT_SHOT_SUFFIX}"

Return ONLY valid JSON (no markdown) in this exact structure:
{
  "mode": "multiple_garments_remix",
  "garment_analysis": "Detailed analysis of each garment and their materials...",
  "upcycling_ideas": [
    {
      "id": 1,
      "title": "Short descriptive name",
      "design_description": "Step-by-step remix description referencing pieces...",
      "image_prompt": "Image-to-image garment modification: ... ${PRODUCT_SHOT_SUFFIX}"
    }
  ]
}

Rules:
- Exactly 3 ideas in upcycling_ideas
- Each idea must combine elements from multiple uploaded pieces
- image_prompt must be actionable for multi-image image-to-image editing`;
}

function normalizeUpcycleResult(parsed, imageCount) {
  const mode = imageCount === 1 ? 'single_garment_redesign' : 'multiple_garments_remix';
  const ideas = (parsed.upcycling_ideas || []).slice(0, 3).map((idea, index) => ({
    id: idea.id || index + 1,
    title: idea.title || `Design ${index + 1}`,
    design_description: idea.design_description || '',
    image_prompt: ensureProductShotSuffix(idea.image_prompt || ''),
  }));

  while (ideas.length < 3) {
    ideas.push({
      id: ideas.length + 1,
      title: `Design ${ideas.length + 1}`,
      design_description: 'Additional design concept based on the uploaded garment(s).',
      image_prompt: ensureProductShotSuffix('Image-to-image garment modification: Creative upcycled wearable garment from the provided piece(s).'),
    });
  }

  return {
    mode: parsed.mode || mode,
    garment_analysis: parsed.garment_analysis || parsed.analysis || '',
    upcycling_ideas: ideas,
  };
}

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    dashscope: !!DASHSCOPE_API_KEY,
    github_models: !!API_KEY,
  });
});

app.get('/models', (req, res) => {
  res.json({
    success: true,
    models: AVAILABLE_MODELS,
    sizes: OUTPUT_SIZES,
    defaultModel: 'qwen-image-2.0-pro',
    defaultSize: '1536*1024',
  });
});

app.post('/upcycle', upload.array('images', 2), async (req, res) => {
  try {
    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({ error: 'At least one image is required (max 2)' });
    }
    if (files.length > 2) {
      return res.status(400).json({ error: 'Maximum 2 images allowed' });
    }

    const imageDataUrls = files.map(f => bufferToDataUrl(f.buffer, f.mimetype));

    const visionContent = [];
    imageDataUrls.forEach((url) => {
      visionContent.push({
        type: 'image_url',
        image_url: { url },
      });
    });

    const userText = files.length === 1
      ? 'Analyze this garment and generate 3 upcycling design ideas using the SAME material and colors. Return the JSON as specified.'
      : `Analyze these ${files.length} garments and generate 3 creative remix upcycling ideas that combine their materials. Return the JSON as specified.`;

    visionContent.push({ type: 'text', text: userText });

    const response = await fetch(`${GITHUB_MODELS_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: GITHUB_MODELS_MODEL,
        messages: [
          { role: 'system', content: buildUpcycleSystemPrompt(files.length) },
          { role: 'user', content: visionContent },
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({
        error: 'Error analyzing garments',
        message: error.error?.message || error.message || JSON.stringify(error),
      });
    }

    const data = await response.json();
    const rawContent = data.choices[0].message.content;
    const parsed = parseJsonFromGpt(rawContent);
    const result = normalizeUpcycleResult(parsed, files.length);

    res.json({
      success: true,
      imageCount: files.length,
      images: imageDataUrls,
      mode: result.mode,
      upcycling_ideas: result.upcycling_ideas.map(({ id, title, design_description, image_prompt }) => ({
        id,
        title,
        design_description,
        image_prompt,
      })),
    });
  } catch (error) {
    console.error('Upcycle Analysis Error:', error.message);
    res.status(500).json({
      error: 'Error in upcycle analysis',
      message: error.message,
    });
  }
});

function buildImagePayload(model, prompt, images, size) {
  const content = [];

  (images || []).forEach((image) => {
    content.push({ image });
  });
  content.push({ text: prompt });

  return {
    model,
    input: {
      messages: [{
        role: 'user',
        content,
      }],
    },
    parameters: {
      n: 1,
      negative_prompt: ' ',
      prompt_extend: true,
      watermark: false,
      size: size || '1024*1024',
    },
  };
}

async function callQwenImage(model, prompt, images, size) {
  const payload = buildImagePayload(model, prompt, images, size);

  const response = await axios.post(DASHSCOPE_ENDPOINT, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DASHSCOPE_API_KEY}`,
    },
    timeout: 180000,
  });

  const result = response.data;
  if (result.output?.choices?.[0]?.message?.content) {
    return result.output.choices[0].message.content
      .filter(item => item.image)
      .map(item => item.image);
  }

  throw new Error(result.message || 'No images in API response');
}

app.post('/generate', express.json(), async (req, res) => {
  try {
    const {
      prompt,
      images = [],
      size = '1024*1024',
      model = 'qwen-image-2.0-pro',
    } = req.body;

    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });
    if (!images.length) return res.status(400).json({ error: 'At least one source image is required' });

    if (!AVAILABLE_MODELS[model]) {
      return res.status(400).json({
        error: 'Unsupported model',
        message: `Use one of: ${Object.keys(AVAILABLE_MODELS).join(', ')}`,
      });
    }

    if (!OUTPUT_SIZES[size]) {
      return res.status(400).json({
        error: 'Unsupported size',
        message: `Use one of: ${Object.keys(OUTPUT_SIZES).join(', ')}`,
      });
    }

    const finalPrompt = ensureProductShotSuffix(prompt);
    const generatedImages = await callQwenImage(model, finalPrompt, images, size);

    res.json({ success: true, images: generatedImages, model, size });
  } catch (error) {
    console.error('Image Generation Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Error generating image',
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
    });
  }
});

// Placeholder for authentication routes
// IMPORTANT: If you have your routes in a separate file using express.Router(), 
// you MUST mount it like this:
// const authRouter = require('./path/to/your/auth/file');
// app.use('/', authRouter); 

app.post('/signup', (req, res) => {
  console.log('Signup request received:', req.body);
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required for signup.' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  // In a real app: hash password, save user, generate token
  res.status(201).json({
    message: 'User registered successfully (dummy response)',
    token: 'dummy_jwt_token_signup_' + Date.now(),
    _id: 'dummy_user_id_signup_' + Date.now(),
  });
});

app.post('/login', (req, res) => {
  console.log('Login request received:', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required for login.' });
  }

  // In a real app: verify credentials, generate token
  res.status(200).json({
    message: 'User logged in successfully (dummy response)',
    token: 'dummy_jwt_token_login_' + Date.now(),
    _id: 'dummy_user_id_login_' + Date.now(),
    user: {
      profile: { first_name: 'Dummy', last_name: 'User' },
      email: email,
      _id: 'dummy_user_id_login_' + Date.now(),
      userImage: null, // Placeholder
    }
  });
});

app.put('/users/profile', (req, res) => {
  console.log('Update profile request received:', req.body);
  const { firstName, lastName } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided.' });
  }
  if (!firstName || !lastName) {
    return res.status(400).json({ message: 'First name and last name are required.' });
  }

  // In a real app: verify token, update user profile in DB
  res.status(200).json({ message: 'Profile updated successfully (dummy response).' });
});

app.post('/send-verification', (req, res) => {
  console.log('Email verification request received.');
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided.' });
  }

  // In a real app: send verification email
  res.status(200).json({ message: 'Verification email sent (dummy response).' });
});

app.get('/users/:userId', (req, res) => {
  console.log('Get user by ID request received:', req.params.userId);
  const token = req.headers.authorization?.split(' ')[1];
  const userId = req.params.userId;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided.' });
  }

  // In a real app: verify token, fetch user from DB
  res.status(200).json({
    user: {
      _id: userId,
      email: 'dummy@example.com', // Placeholder
      profile: { first_name: 'Dummy', last_name: 'User' },
      userImage: null,
    }
  });
});

app.get('/google', (req, res) => {
  console.log('Google auth initiation received.');
  const dummyToken = 'google_dummy_jwt_token_' + Date.now();
  const dummyUser = {
    _id: 'google_dummy_user_id_' + Date.now(),
    email: 'google.dummy@example.com',
    first_name: 'Google',
    last_name: 'User'
  };
  res.send(`<script>window.opener.postMessage({type: 'GOOGLE_AUTH_SUCCESS', payload: {token: '${dummyToken}', _id: '${dummyUser._id}', email: '${dummyUser.email}', first_name: '${dummyUser.first_name}', last_name: '${dummyUser.last_name}'}}, window.location.origin);window.close();</script>`);
});

// Placeholder for password reset and account management routes
app.post('/forgot-password', (req, res) => {
  console.log('Forgot password request received:', req.body);
  res.status(200).json({ message: 'OTP sent to email (dummy response).' });
});

app.post('/verify-otp', (req, res) => {
  console.log('Verify OTP request received:', req.body);
  res.status(200).json({ message: 'OTP verified (dummy response).' });
});

app.put('/reset-password', (req, res) => {
  console.log('Reset password request received:', req.body);
  res.status(200).json({ message: 'Password reset successfully (dummy response).' });
});

app.delete('/users/account', (req, res) => {
  console.log('Delete account request received:', req.body);
  res.status(200).json({ message: 'Account deleted successfully (dummy response).' });
});

app.post('/users/settings', (req, res) => {
  console.log('User settings update received:', req.body);
  res.status(200).json({ message: 'User settings updated successfully (dummy response).' });
});

const distPath = path.join(__dirname, 'dist');
if (require('fs').existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/^(?!\/(upcycle|generate|models|health)).*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});