import { createI18n } from "vue-i18n";

const messages = {
  en: {
    nav: {
      home: "Home",
      features: "Features",
      tryOn: "Try-On",
      recycle: "Recycle",
      store: "Store",
      store: "Store",
      pricing: "Pricing",
      about: "About",
      login: "Login",
      signup: "Sign up",
    },
    errors: {
      generic: "Something went wrong. Please try again.",
      api_not_found: "API endpoint not found. Start the TryOn backend on port 5000.",
      invalid_response: "Unexpected server response ({status}).",
    },
    header: {
      primaryText: "Your Personal",
      gradientText: "AI Stylist",
      description:
        "Get outfit recommendations, virtual try-ons, and wardrobe insights tailored to your style. smart.fast.effortless.",
      cta: "Start Styling",
    },
    features: {
      sectionTitle: "Fashion Intelligence",
      sectionDescription: "Built for the next generation of style enthusiasts.",
      aiRecommendations: {
        title: "AI Recommendations",
        description:
          "Proprietary algorithms that learn your aesthetic and suggest outfits that actually match your personality.",
      },
      tryOn: {
        title: "Try-on",
        description:
          "Try on your personal image or on an avatar that Precise body mapping technology.",
      },
      recycle: {
        title: "Recycle",
        description:
          "Reimagine your closet. Our AI filters global runway trends to transform your existing clothes into next-season statements.",
      },
    },
    steps: {
      title: "Simple, Smart, Seamless",
      uploadSync: {
        stepNumber: "1",
        title: "Upload & Sync",
        description:
          "Upload photos of your current wardrobe or sync with your favorite shopping apps.",
      },
      neuralAnalysis: {
        stepNumber: "2",
        title: "Neural Analysis",
        description:
          "Our AI analyzes color palettes, textures, and silhouettes to build your digital DNA.",
      },
      curatedStyling: {
        stepNumber: "3",
        title: "Curated Styling",
        description:
          "Receive personalized daily lookbooks and shopping suggestions that fit your style.",
      },
    },

    sustainable: {
      title: "We make your Wardrobe Sustainable!",
      titlePart1: "We make your Wardrobe",
      titlePart2: "Sustainable!",
      description:
        "ReDolapy is committed to circular fashion. Our platform doesn't just help you style your clothes—it helps you manage their entire lifecycle. Join our movement to reduce textile waste through smart recycling, reselling, and donation programs.",
      recycleRenew: "Recycle & Renew",
      recycleDescription:
        "Easily request a recycling kit for items that have reached the end of their life.",
      learnRecycling: "Learn about Recycling",
      learnTryOn: "Learn about Try On",
      coreFeaturesTitle: "What We <span class='gradientColor'>make?</span>",
      coreFeaturesSubtitle: "Let’s Know ReDolapy Core Value",
    },
    tryOnSection: {
      yourMirror: "Your Mirror",
      reimagined: "Re Imagined.",
      description:
        "The Redolapy Virtual Try-On uses hyper-realistic rendering to show you exactly how clothes will look and drape on your body.",
      button: "Try On",
    },
    tryOn: {
      header_title: "Redolapy Virtual Try-on",
      header_subtitle: "Upload your pieces · Pick a style · See it come to life",
      steps: {
        image: "Upload Your image",
        image_subtitle: "Upload a photo or pick an avatar",
        clothes: "Upload Your clothes",
        clothes_subtitle: "Upload 1-2 garment photos",
        tryon: "Virtual Try-on",
        tryon_subtitle: "See your outfit come to life",
      },
      model: {
        choose_title: "Choose your model",
        personal_photo: "Personal Photo",
        personal_subtitle: "Upload your own image",
        personal_card_desc: "Upload your own photo for realistic try-on",
        use_avatar: "Use Avatar",
        avatar_subtitle: "Pick a preset model",
        avatar_card_desc: "Create your digital twin and try outfits instantly",
        upload_prompt: "Upload your photo (JPG, PNG, WEBP)",
        select_avatar: "Select an avatar",
        your_photo: "Your Photo",
        avatar_label: "Avatar",
        personal_label: "Personal image",
        avatar_classic: "Classic Model",
        avatar_casual: "Casual Look",
        avatar_studio: "Studio Pose",
        select_avatar_aria: "Select {name}",
      },
      garments: {
        title: "Upload Your Garments",
        support_text: "Support for JPG, PNG, WEBP (max 10MB each)",
        drag_prompt: "Click or drag images here",
        current_selection: "Current Selection",
        no_items: "No items selected yet",
        add_more: "Add More Pieces",
        uploaded_garment: "Uploaded garment",
        generate_btn: "Try-on",
        generating: "Generating your try-on…",
        remove_aria: "Remove {name}",
      },
      output: {
        heading: "Your Virtual Try-on",
        save_btn: "Add to Wardrobe",
        download_btn: "Save",
        try_again_btn: "Try again",
        saving: "Adding…",
        downloading: "Saving…",
        style_match: "{percent}% Style Match",
        zoom_aria: "Zoom image",
      },
      errors: {
        generic: "Something went wrong. Please try again.",
        save_failed: "Failed to add to wardrobe.",
        upload_first: "Please upload your model and garments first.",
        need_two_garments: "Upload a top and a bottom garment to try on a full outfit.",
        missing_kie_key: "KIE API key is missing. Add VITE_KIE_API_KEY to your .env file.",
        missing_hf_token: "Hugging Face token is missing. Add VITE_HF_TOKEN to your .env file.",
        kie_upload_quota: "KIE upload limit reached (30 files per 30 days on free plan). Wait for the limit to reset, upgrade your KIE plan, or use a different API key.",
      },
      warnings: {
        format_error: "Unsupported file format. Use {formats}.",
        max_files: "You can only upload up to 2 garment images.",
        size_limit: "Each image must be 10MB or smaller.",
      },
      mock_description:
        "Our AI has seamlessly combined your uploaded garments into a cohesive look. The silhouette balances structure and flow, pairing your pieces for a polished virtual try-on preview.",
    },
    avatar: {
      page: {
        title_prefix: "Create your ",
        title_highlight: "Personal Avatar",
        subtitle: "Make it exactly like you!",
      },
      form: {
        title: "Set your Avatar Parameters",
        age: "Age",
        age_placeholder: "e.g. 25",
        gender: "Gender",
        male: "Male",
        female: "Female",
        weight: "Weight (kg)",
        weight_placeholder: "e.g. 70",
        height: "Height (cm)",
        height_placeholder: "e.g. 175",
        skin_tone: "Skin tone",
        hair_color: "Hair color",
        skin_very_light: "Very light",
        skin_light: "Light",
        skin_medium: "Medium",
        skin_tan: "Tan",
        skin_brown: "Brown",
        skin_dark: "Dark",
        hair_black: "Black",
        hair_dark_brown: "Dark brown",
        hair_brown: "Brown",
        hair_light_brown: "Light brown",
        hair_blonde: "Blonde",
        hair_red: "Red",
        generate_btn: "Generate Avatar",
        generating: "Generating your avatar…",
      },
      preview: {
        placeholder: "Your avatar will appear here",
      },
      result: {
        alt: "Generated avatar",
        use_hover: "Use for try-on",
        use_aria: "Use this avatar for try-on",
        download_aria: "Download avatar",
        download_hover: "Download",
        try_on_btn: "Virtual Try on",
        try_again: "Try again",
      },
      selector: {
        title: "Select an avatar",
        create_aria: "Create another avatar",
        upgrade_aria: "Upgrade to create more avatars",
        select_aria: "Select {name}",
      },
      default_name: "My Avatar",
      errors: {
        generate_failed: "Could not generate avatar. Please try again.",
        download_failed: "Could not download avatar. Please try again.",
        kie_credits: "Avatar generation credits are exhausted and no fallback is configured. Add VITE_DASHSCOPE_API_KEY and VITE_DASHSCOPE_ENDPOINT to your .env file, then restart the dev server.",
        quota_used: "You have already used your free avatar generation. Upgrade your plan to create more.",
        missing_dashscope_endpoint: "DashScope endpoint is missing. Add VITE_DASHSCOPE_ENDPOINT to your .env file (same value as DASHSCOPE_ENDPOINT in the backend).",
      },
    },
    store: {
      title: "Stores",
      promo_prefix: "you can get Discount on all your Favorite Brands Now, when you",
      promo_highlight: "install the application!",
      search_placeholder: "Search",
      filters: "Filters",
      brands: "Brands",
      colors: "Colors",
      season: "Season",
      categories: "Categories",
      reset_all: "Reset All",
      price_range: "Price Range",
      seasons: {
        summer: "Summer",
        spring: "Spring",
        fall: "Fall",
        winter: "Winter",
      },
      category_options: {
        dress: "Dress",
        top: "Top",
        bottom: "Bottom",
      },
      brand_options: {
        hm: "HM",
        zara: "ZARA",
      },
      product: {
        view: "View",
        brand: "Brand",
        try_on: "Try-on",
        wishlist_aria: "Add to wishlist",
        remove_wishlist_aria: "Remove from wishlist",
        view_on_store: "View on store",
      },
      currency: "EGP",
    },
    wishlist: {
      title: "Wishlist",
      subtitle_prefix: "Save the pieces you love and come back to them anytime when you",
      subtitle_highlight: "heart a product!",
      loading: "Loading your wishlist…",
      empty: "No items match your filters.",
      empty_lonely: "Your favorites are lonely.",
      no_matches: "No wishlist items match your search or filters.",
    },
     brands: {
    viewAll: "View all",
    title: "Our Brand Partners:",
    subtitle: "Discover and shop from your favorite fashion Stores with exclusive discounts found only on",
    appName: "ReDolapy Application.",
    hm: {
      title: "H&M",
      description: "Discover your Favorite Items in H&M and get the discount on what you love from the Application"
    }
  },
   
    pricing: {
      title: "Subscription plans",
      subtitle: "Pick your fav plan to get started",
      completeSubscription: "Complete Subscription",
      monthlyToggle: "Monthly",
      yearlyToggle: "Yearly",
      completeSubscription: "Complete Subscription",
      paymentMethod: "Payment Method",
      cardNumber: "Card Number",
      dateFormat: "MM / YY",
      cvv: "CVV",
      savePayment: "Save payment information for subsequent renewals",
      monthly: "Monthly Subscription",
      monthlyPrice: "$29.00",
      earlyBirdDiscount: "Early Bird Discount",
      discountAmount: "-$10.00",
      estimatedTax: "Estimated Tax",
      taxAmount: "$0.00",
      dueToday: "Due Today",
      dueTodayValue: "$19.00",
      terms:
        "By finalizing your purchase, you authorize ReDolapy to initiate recurring automatic processing cycles. Cancel anytime inside workspace configurations.",

      // 💡 Added Missing Free Plan Block
      free: {
        name: "Free Plan",
        price: "$0",
        priceUnit: "/ month",
        button: "Get Started Free",
        features: [
          "Manage up to 20 clothing items",
          "Standard 2D Avatar fittings",
          "Basic upcycling design ideas",
        ],
      },

      pro: {
        name: "Pro plan",
        price: "$19",
        priceUnit: "/ month",
        button: "Finalize & Activate Plan",
        features: [
          "Infinite High-Fidelity 2D Avatar Fittings",
          "Intelligent Wardrobe Color Match Matrix",
          "Advanced High-Resolution Vector Canvas Exports",
          "Priority Graphics Rendering Pipeline Lanes",
        ],
      },
    },


     faq: {
      title: "Frequently Asked Questions",
      questions: [
        {
          title: "How does the AI know my size?",
          answer:
            "Our advanced AI analyzer maps your physical body geometry measurements using standard metrics or a quick photo scan to cross-reference fit scales across global retail brands seamlessly.",
        },
        {
          title: "Can I use Redolapy with my current clothes?",
          answer:
            "Yes! You can take photos of your existing wardrobe pieces, and our digital closet system will instantly catalog them and generate fresh style lookbooks combined with new styling recommendations.",
        },
        {
          title: "how can i try on if i don't want to upload my photo ?",
          answer:
            "ReDolapy is offering a Virtual Try On using an avatar Exactly Like you by when you sets its pararmeters to be like you",
        },
      ],
    },
 
    recycle: {
      header_title: "Redolapy Up-cycling Design Generator",
      header_subtitle:
        "Upload your pieces · Pick a design · See it come to life",

      steps: {
        upload: "Upload",
        upload_subtitle: "Upload 1-2 garment photos",
        choose: "Choose Idea",
        choose_subtitle: "Pick your favorite design",
        result: "Generate",
        result_subtitle: "Visualize your upcycled piece",
      },

      upload: {
        title: "Upload Your Garments",
        support_text: "Support for JPG, PNG, WEBP (max 10MB each)",
        drag_prompt: "Click or drag images here",
        piece_prefix: "Piece",
        button: "Discover Design Ideas",
        loading: "Creating your design ideas…",
        warnings: {
          format_error: "Unsupported file format. Use",
          max_files: "You cannot upload more than 2 images.",
          size_limit: "Each image must be 10MB or smaller.",
        },
      },

      ideas: {
        title: "Choose Your Style Idea",
        badge: "AI Suggested",
        ai_engine: "AI Engine",
        aspect_ratio: "Aspect Ratio",
        submit: "Generate Selected Design",
        loading: "Generating…",
      },

      card: {
        see_more: "See more",
        see_less: "See less",
        selected: "Selected",
        remove_piece: "Remove piece {n}",
      },

      output: {
        heading: "Your Generated Design",
        save_btn: "Save Specs",
        saving: "Downloading…",
      },

  errors: {
    upload_first: 'Please upload garments and discover design ideas first.',
    save_failed: 'Failed to download image.',
    login_required: 'Please log in to analyze garments and generate designs.',
    missing_github_key: 'GitHub API key is missing. Add VITE_GITHUB_TOKEN to your .env file.',
    missing_dashscope_key: 'DashScope API key is missing. Add VITE_DASHSCOPE_API_KEY to your .env file.',
  },
},

    aboutRecycle: {
      header_primary: "Why Upcycling Matters",
      header_gradient: "Sustainable Fashion",
      header_description:
        "Discover how turning old clothes into new pieces can save resources, reduce waste, and refresh your wardrobe with style.",
      header_cta: "Start Recycle",
      btn_see_how_to_recycle: "See How to Recycle",
      title: "Why Upcycling Matters",
      subtitle: "Small changes today, big impact tomorrow.",
      cards_section_description:
        "Explore how simple wardrobe choices lead to meaningful environmental benefits.",
      saveWater: {
        title: "Save Water",
        description: "Upcycling uses significantly less water",
      },
      saveMoney: {
        title: "Save Money",
        description: "Refresh your personal style and get",
      },
      reduceWaste: {
        title: "Reduce Waste",
        description: "Keep clothing out of landfills and",
      },
      examples: {
        title: "See What AI Can Create",
        subtitle: "From old to new — endless creative possibilities.",
        denimBag: "Denim Tote Bag",
        oldJeans: "Shirt Makeover",
      },
      example1_description:
        "Turn a denim jacket into a custom tote bag with a fresh new look.",
      example2_description:
        "Transform an old shirt into a stylish piece with new patterns and details.",
      example3_title: "Old Jeans",
      example3_description:
        "Give your worn jeans a second life as a trendy upcycled accessory.",

      how_it_works_title: "How It Works",
      how_it_works_description:
        "Follow a simple three-step process to upload, get AI-powered ideas, and transform your items into refreshed fashion.",
      uploadProcess: {
        title: "Upload Your Clothing",
        description:
          "Take photos of items you no longer wear or use and add them to your digital atelier.",
      },
      aiSuggests: {
        title: "AI Suggests Ideas",
        description:
          "Our AI analyzes your items and generates creative upcycling ideas tailored to your style.",
      },
      transformReuse: {
        title: "Transform & Reuse",
        description:
          "Bring your new design to life or connect with creators in our curated marketplace.",
      },
    },
    aboutTryon: {
      header_primary: "Experience Fashion Virtually with Our",
      header_gradient: "AI Try-On Fitting Room",
      header_description:
        "Visualize how outfits naturally drape, fit, and look on your unique shape without stepping foot into a changing stall.",
      header_cta: "Try It On Now",
      see_how_cta: "See How to Try on",

      cards_section_title: "Why Use Our Virtual Fitting Room?",
      cards_section_description:
        "Discover an advanced alternative to traditional clothing shopping that saves your time and ensures perfect style matching.",

      card1_title: "Instant Visual Representation",
      card1_description:
        "Get an accurate 2D projection of how premium patterns and color tones display directly against your personal styling parameters.",
      card2_title: "True-to-Size Accuracy",
      card2_description:
        "Our smart dimension matching maps custom design assets directly to your body data structures seamlessly.",
      card3_title: "Creative Style Freedom",
      card3_description:
        "Mix and match unlimited creative aesthetic wardrobe alternatives without having to purchase pieces upfront.",

      how_it_works_title: "How It Works",
      how_it_works_description:
        "Follow three simple, fast steps to preview any outfit variant on your digital canvas profile instantly.",

      step1_title: "Upload Garment Picture",
      step1_description:
        "Snap a clear photo or paste a link of any clothing product design you would like to test.",
      step2_title: "Set Your Personal Canvas",
      step2_description:
        "Select your customized digital avatar or supply a quick full-body perspective snapshot.",
      step3_title: "Generate AI Fitting Look",
      step3_description:
        "Let our intelligent core process your inputs and construct a realistic design output view instantly.",
    },
    upload: {
      piece: "Piece",
      analyzing: "Creating your design ideas…",
      discover: "Discover Design Ideas",
    },
   
    payment: {
      completeSubscription: "Complete Subscription",
      paymentMethod: "Payment Method",
      cardNumber: "Card Number",
      dateFormat: "MM/YY",
      cvv: "CVV",
      savePayment: "Save payment details for future use",
    },
     auth: {
      tabs: {
        signUp: "Sign Up",
        login: "Login",
      },
      signup: {
        title: "Create Your Style Profile",
        subtitle: "Start building your personalized wardrobe",
        firstName: "First name",
        firstNamePlaceholder: "e.g. Engy",
        lastName: "Last name",
        lastNamePlaceholder: "e.g. Ahmed",
        email: "Email",
        emailPlaceholder: "Enter your email",
        password: "Password",
        passwordPlaceholder: "Create strong password",
        confirmPassword: "Confirm password",
        confirmPasswordPlaceholder: "Confirm the password that you created",
        submit: "Next",
        loading: "Please wait...",
        switchText: "Already have an account?",
        switchLink: "Login now",
        successMessage:
          "We sent an email to verify your account. Check your inbox.",
      },
      login: {
        title: "Welcome Back",
        subtitle: "Log in to your account",
        email: "Email",
        emailPlaceholder: "Enter your email",
        password: "Password",
        passwordPlaceholder: "Enter your password",
        forgotPassword: "Forgot password?",
        submit: "Login",
        loading: "Please wait...",
        switchText: "Don't have an account?",
        switchLink: "Sign up now",
      },
      panel: {
        emailTitle: "Don't Worry,",
        welcomeBack: "Welcome <br/>Back",
        welcomeTo: "Welcome To<br/>Redolapy",
        noAccount: "Don't Have an account?",
        alreadyHaveAccount: "Already have an account?",
        signUp: "Sign up",
        login: "Login",
      },
      common: {
        orDivider: "——— OR ———",
        continueWithGoogle: "Continue with Google",
        error: {
          somethingWentWrong: "Something went wrong",
        },
      },
    },
    fp: {
      forgotTitle: "Forgot Password?",
      forgotSubtitle:
        "No worries, enter your email below to receive a verification code.",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email address",
      sending: "Sending...",
      next: "Next",
      hintSpam:
        "Be sure to check your spam or junk folder if you don't see it.",
      or: "OR",
      hintDifferent:
        "Try a different email address if you still can't find it.",
      backToLogin: "Back to login",
      verificationTitle: "Verify Your Email",
      verificationSubtitle: "We sent a 6-digit verification code to {email}",
      verifying: "Verifying...",
      verifyContinue: "Verify & Continue",
      didnotReceiveCode: "Didn't receive the code?",
      resendCode: "Resend Code",
      requestCodeIn: "Request a new code in {timer}",
      setNewPasswordTitle: "Set New Password",
      setNewPasswordSubtitle:
        "Create a strong, unique password to secure your account.",
      passwordLabel: "New Password",
      passwordPlaceholder: "Create a strong password",
      confirmPasswordLabel: "Confirm New Password",
      confirmPasswordPlaceholder: "Confirm your new password",
      securityTip:
        "Make sure your password is at least 8 characters long and contains mixed case letters.",
      saving: "Saving...",
      resetPassword: "Reset Password",
      panel: {
        emailTitle: "Don't Worry,",
        welcomeBack: "Welcome <br/>Back",
        welcomeTo: "Welcome To<br/>Redolapy",
        noAccount: "Don't Have an account?",
        alreadyHaveAccount: "Already have an account?",
        signUp: "Sign up",
        login: "Login",
        emailSubtitle:
          "We will help you safely recover your profile access within seconds.",
        otpTitle: "Check Your Inbox",
        otpSubtitle:
          "A secure token has been dispatched to establish identity validation.",
        resetTitle: "Secure Account",
        resetSubtitle:
          "Almost completed! Finalize your credentials to log back into your session.",
        },
        strength: {
          none: "",
          weak: "Weak ❌",
          fair: "Fair ⚠️",
          good: "Good 👍",
          strong: "Strong 💪",
        }
    },
    footer: {
      brandName: "ReDolapy",
      tagline:
        "Re-think your wardrobe. Re-define your style.",
      platform: "Platform",
      styleGuide: "Style Guide",
      tryOn: "Try On",
      features: "Features",
      ContactUs: "Contact Us",
      telegram: "Telegram",
      copyright: "© 2026 ReDolapy AI. All rights reserved.",
      privacyPolicy: "Privacy Policy",
    },
    auth: {
      tabs: {
        signUp: "Sign Up",
        login: "Login",
      },
      signup: {
        title: "Create Your Style Profile",
        subtitle: "Start building your personalized wardrobe",
        firstName: "First name",
        firstNamePlaceholder: "e.g. Engy",
        lastName: "Last name",
        lastNamePlaceholder: "e.g. Ahmed",
        email: "Email",
        emailPlaceholder: "enter your email",
        password: "Password",
        passwordPlaceholder: "create strong password",
        confirmPassword: "Confirm password",
        confirmPasswordPlaceholder: "confirm the password that you created",
        submit: "Next",
        loading: "Please wait...",
        switchText: "Already have an account?",
        switchLink: "Login now",
        successMessage:
          "We sent an email to verify your account. Check your inbox.",
      },
      login: {
        title: "Welcome Back",
        subtitle: "Log in to your account",
        email: "Email",
        emailPlaceholder: "enter your email",
        password: "Password",
        passwordPlaceholder: "enter your password",
        forgotPassword: "Forgot password?",
        submit: "Login",
        loading: "Please wait...",
        switchText: "Don't have an account?",
        switchLink: "Sign up now",
      },
      panel: {
        emailTitle: "Don't Worry,",
        welcomeBack: "Welcome <br/>Back",
        welcomeTo: "Welcome To<br/>Redolapy",
        noAccount: "Don't Have an account?",
        alreadyHaveAccount: "Already have an account?",
        signUp: "Sign up",
        login: "Login",
      },
      common: {
        orDivider: "——— OR ———",
        continueWithGoogle: "Continue with Google",
        error: {
          somethingWentWrong: "Something went wrong",
        },
      },
    },

    
  "contact": {
    "titlePart1": "Contact",
    "titlePart2": "ReDolapy Team",
    "description": "Have a question, partnership idea, or just want to say hi? Drop us a message and we'll get back to you as soon as possible.",
    "form": {
      "nameLabel": "Name",
      "namePlaceholder": "name",
      "emailLabel": "Email",
      "emailPlaceholder": "user@gmail.com",
      "messageLabel": "Message",
      "messagePlaceholder": "write your message here",
      "sendButton": "Send"
    }
  
},
    fp: {
      forgotTitle: "Forgot Password?",
      forgotSubtitle:
        "No worries! It happens to the best of us. Enter the email address associated with your account and we'll send you a link to reset your password.",
      emailLabel: "Email",
      emailPlaceholder: "enter your email",
      sending: "Sending...",
      next: "Next",
      hintSpam: "Didn't receive the email? Check your spam folder",
      or: "OR",
      hintDifferent: "Try a different email address",
      backToLogin: "Back to Login",
      verificationTitle: "Enter Verification Code",
      verificationSubtitle:
        "We sent a 6-digit code to {email}. Enter it below to proceed.",
      verifying: "Verifying...",
      verifyContinue: "Verify & Continue",
      didnotReceiveCode: "Didn't receive the code?",
      resendCode: "Resend Code",
      requestCodeIn: "Request a new code in {timer}",
      setNewPasswordTitle: "Set New Password",
      setNewPasswordSubtitle:
        "Choose a unique, strong password that you haven't used before for this account.",
      passwordLabel: "Password",
      passwordPlaceholder: "create strong password",
      confirmPasswordLabel: "Confirm password",
      confirmPasswordPlaceholder: "confirm the password that you created",
      securityTip:
        "Use 8+ characters with letters, numbers & symbols for a stronger password.",
      saving: "Saving...",
      resetPassword: "Reset Password",
      strength: {
        none: "",
        weak: "Weak ❌",
        fair: "Fair ⚠️",
        good: "Good 👍",
        strong: "Strong 💪",
      },
      panel: {
        emailTitle: "Don't Worry,",
        emailSubtitle:
          "We will help you safely recover your profile access within seconds.",
        otpTitle: "Check Your Inbox",
        otpSubtitle:
          "A secure token has been dispatched to establish identity validation.",
        resetTitle: "Secure Account",
        resetSubtitle:
          "Almost completed! Finalize your credentials to log back into your session.",
      },
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      features: "المميزات",
      tryOn: "جرب الآن",
      recycle: "إعادة التدوير",
      store: "المتجر",
      store: "المتجر",
      pricing: "الأسعار",
      about: "حول",
      login: "دخول",
      signup: "إنشاء حساب",
    },
    errors: {
      generic: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
      api_not_found: "لم يتم العثور على واجهة البرمجة. شغّل الخادم الخلفي على المنفذ 5000.",
      invalid_response: "استجابة غير متوقعة من الخادم ({status}).",
    },
    header: {
      primaryText: "مستشارك الشخصي",
      gradientText: "بالذكاء الاصطناعي",
      description:
        "احصل على توصيات الملابس والتجارب الافتراضية ورؤى خزانة ملابسك المخصصة. ذكي.سريع.بسيط.",
      cta: "ابدأ الآن",
    },
    features: {
      sectionTitle: "الذكاء الاصطناعي في الموضة",
      sectionDescription: "مصمم لجيل جديد من محبي الأسلوب.",
      aiRecommendations: {
        title: "التوصيات بالذكاء الاصطناعي",
        description:
          "خوارزميات متطورة تتعلم ذوقك الشخصي وتقترح عليك ملابس تناسب شخصيتك تماماً.",
      },
      tryOn: {
        title: "جرب الملابس افتراضياً",
        description:
          "جربها على صورتك الشخصية أو على صورة رمزية باستخدام تقنية رسم خرائط الجسم الدقيقة.",
      },
      recycle: {
        title: "إعادة التدوير",
        description:
          "ابقَ في الطليعة مع تحليل فوري لاتجاهات أزياء العروض العالمية مفلترة عبر عدسة أسلوبك الشخصي.",
        title: "إعادة التدوير",
        description:
          "ابقَ في الطليعة مع تحليل فوري لاتجاهات أزياء العروض العالمية مفلترة عبر عدسة أسلوبك الشخصي.",
      },
    },
    steps: {
      title: "بسيط، ذكي، سلس",
      uploadSync: {
        stepNumber: "1",
        title: "رفع المنتجات ومزامنتها",
        description:
          "قم برفع صور ملابسك الحالية أو قم بالمزامنة مع تطبيقات التسوق المفضلة لديك.",
      },
      neuralAnalysis: {
        stepNumber: "2",
        title: "التحليل الذكي",
        description:
          "يحلل الذكاء الاصطناعي الألوان والقوام والقصات لبناء ملفك الشخصي الرقمي.",
      },
      curatedStyling: {
        stepNumber: "3",
        title: "التصميم المختار",
        description:
          "احصل على اقتراحات أسلوب شخصية يومية وتوصيات للتسوق التي تناسب ذوقك.",
      },
    },
    // sustainable: {
    //   title: "خزانة ملابس مستدامة",
    //   description:
    //     "نحن ملتزمون بالموضة الدائرية. منصتنا لا تساعدك فقط على تنسيق ملابسك، بل تساعدك على إدارة دورة حياتها بالكامل. انضم إلى حركتنا لتقليل نفايات النسيج من خلال إعادة التدوير والبيع والتبرع الذكي.",
    //   recycleRenew: "إعادة تدوير وتجديد",
    //   recycleDescription:
    //     "قدّم طلب بسهولة لصندوق إعادة تدوير للملابس التي انتهت صلاحيتها.",
    //   learnRecycling: "تعرّف على إعادة التدوير",
    //   learnTryOn: "تعرّف على التجربة الافتراضية",
    // },

    sustainable: {
      title: "نحن نجعل خزانة ملابسك مستدامة!",
      titlePart1: "نحن نجعل خزانة ملابسك",
      titlePart2: "مستدامة!",

      description:
        "منصة ReDolapy ملتزمة بدعم الموضة الدائرية. منصتنا لا تقتصر فقط على مساعدتك في تنسيق ملابسك — بل تساعدك على إدارة دورة حياتها بالكامل. انضم إلى حركتنا لتقليل نفايات المنسوجات من خلال برامج إعادة التدوير الذكية، إعادة البيع، والتبرع.",
      recycleRenew: "إعادة التدوير والتجديد",
      recycleDescription:
        "اطلب بسهولة حقيبة إعادة التدوير لقطع الملابس التي وصلت إلى نهاية عمرها الافتراضي.",
      learnRecycling: "تعرّف على إعادة التدوير",
      learnTryOn: "تعرّف على التجربة الافتراضية",
      coreFeaturesTitle: "ماذا <span class='gradientColor'>نصنع؟</span>",
      coreFeaturesSubtitle: "دعنا نتعرف على القيم الأساسية لمنصة ReDolapy",
    },

    tryOnSection: {
      yourMirror: "مرآتك الشخصية",
      reimagined: "معاد تخيلها.",
      description:
        "تقنية التجربة الافتراضي من ريدولابي تستخدم عرضاً واقعياً فائق الدقة لتوضيح كيفية ملاءمة الملابس لجسدك تماماً.",
      button: "جرب الآن",
    },
    tryOn: {
      header_title: "التجربة الافتراضية من ريدولابي",
      header_subtitle: "ارفع قطعك · اختر أسلوباً · شاهد النتيجة تنبض بالحياة",
      steps: {
        image: "ارفع صورتك",
        image_subtitle: "ارفع صورة أو اختر أفاتار",
        clothes: "ارفع ملابسك",
        clothes_subtitle: "ارفع صورة أو صورتين للقطع",
        tryon: "تجربة افتراضية",
        tryon_subtitle: "شاهد إطلالتك تنبض بالحياة",
      },
      model: {
        choose_title: "اختر نموذجك",
        personal_photo: "صورة شخصية",
        personal_subtitle: "ارفع صورتك الخاصة",
        personal_card_desc: "ارفع صورتك الخاصة لتجربة واقعية للملابس",
        use_avatar: "استخدم أفاتار",
        avatar_subtitle: "اختر نموذجاً جاهزاً",
        avatar_card_desc: "أنشئ نسختك الرقمية وجرب الإطلالات فوراً",
        upload_prompt: "ارفع صورتك (JPG، PNG، WEBP)",
        select_avatar: "اختر أفاتار",
        your_photo: "صورتك",
        avatar_label: "أفاتار",
        personal_label: "صورة شخصية",
        avatar_classic: "نموذج كلاسيكي",
        avatar_casual: "مظهر عادي",
        avatar_studio: "وضعية استوديو",
        select_avatar_aria: "اختر {name}",
      },
      garments: {
        title: "ارفع قطع الملابس",
        support_text: "صيغ الملفات المدعومة: JPG، PNG، WEBP (الحد الأقصى ١٠ ميجابايت لكل صورة)",
        drag_prompt: "اضغط هنا أو اسحب الصور إلى هذا المربع",
        current_selection: "الاختيار الحالي",
        no_items: "لم يتم اختيار أي قطع بعد",
        add_more: "أضف المزيد من القطع",
        uploaded_garment: "قطعة مرفوعة",
        generate_btn: "جرب افتراضياً",
        generating: "جاري إنشاء تجربتك الافتراضية…",
        remove_aria: "إزالة {name}",
      },
      output: {
        heading: "تجربتك الافتراضية",
        save_btn: "أضف إلى الخزانة",
        download_btn: "حفظ",
        try_again_btn: "حاول مرة أخرى",
        saving: "جاري الإضافة…",
        downloading: "جاري الحفظ…",
        style_match: "تطابق الأسلوب {percent}٪",
        zoom_aria: "تكبير الصورة",
      },
      errors: {
        generic: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
        save_failed: "فشلت الإضافة إلى الخزانة.",
        upload_first: "يرجى رفع النموذج والملابس أولاً.",
        need_two_garments: "ارفع قطعة علوية وسفلية لتجربة إطلالة كاملة.",
        missing_kie_key: "مفتاح KIE API مفقود. أضف VITE_KIE_API_KEY إلى ملف .env.",
        missing_hf_token: "رمز Hugging Face مفقود. أضف VITE_HF_TOKEN إلى ملف .env.",
        kie_upload_quota: "تم الوصول إلى حد رفع KIE (30 ملفاً خلال 30 يوماً في الخطة المجانية). انتظر إعادة التعيين أو قم بترقية خطتك.",
      },
      warnings: {
        format_error: "صيغة الملف غير مدعومة. يرجى استخدام {formats}.",
        max_files: "لا يمكنك رفع أكثر من صورتين للملابس.",
        size_limit: "يجب أن يكون حجم كل صورة ١٠ ميجابايت أو أقل.",
      },
      mock_description:
        "دمج الذكاء الاصطناعي قطعك المرفوعة في إطلالة متناسقة. يوازن القص بين البنية والانسيابية لعرض تجربة افتراضية مصقولة.",
    },
    avatar: {
      page: {
        title_prefix: "أنشئ ",
        title_highlight: "أفاتارك الشخصي",
        subtitle: "اجعله يشبهك تماماً!",
      },
      form: {
        title: "حدد معايير الأفاتار",
        age: "العمر",
        age_placeholder: "مثال: 25",
        gender: "الجنس",
        male: "ذكر",
        female: "أنثى",
        weight: "الوزن (كجم)",
        weight_placeholder: "مثال: 70",
        height: "الطول (سم)",
        height_placeholder: "مثال: 175",
        skin_tone: "لون البشرة",
        hair_color: "لون الشعر",
        skin_very_light: "فاتح جداً",
        skin_light: "فاتح",
        skin_medium: "متوسط",
        skin_tan: "أسمر",
        skin_brown: "بني",
        skin_dark: "داكن",
        hair_black: "أسود",
        hair_dark_brown: "بني داكن",
        hair_brown: "بني",
        hair_light_brown: "بني فاتح",
        hair_blonde: "أشقر",
        hair_red: "أحمر",
        generate_btn: "إنشاء الأفاتار",
        generating: "جاري إنشاء أفاتارك…",
      },
      preview: {
        placeholder: "سيظهر أفاتارك هنا",
      },
      result: {
        alt: "الأفاتار المُنشأ",
        use_hover: "استخدم للتجربة",
        use_aria: "استخدم هذا الأفاتار للتجربة الافتراضية",
        download_aria: "تنزيل الأفاتار",
        download_hover: "تنزيل",
        try_on_btn: "تجربة افتراضية",
        try_again: "حاول مرة أخرى",
      },
      selector: {
        title: "اختر أفاتار",
        create_aria: "إنشاء أفاتار آخر",
        upgrade_aria: "ترقية لإنشاء المزيد من الأفاتارات",
        select_aria: "اختر {name}",
      },
      default_name: "أفاتاري",
      errors: {
        generate_failed: "تعذر إنشاء الأفاتار. يرجى المحاولة مرة أخرى.",
        download_failed: "تعذر تنزيل الأفاتار. يرجى المحاولة مرة أخرى.",
        kie_credits: "نفدت رصيد إنشاء الأفاتار ولا يوجد بديل مُعد. أضف VITE_DASHSCOPE_API_KEY و VITE_DASHSCOPE_ENDPOINT إلى ملف .env ثم أعد تشغيل الخادم.",
        quota_used: "لقد استخدمت محاولة إنشاء الأفاتار المجانية. قم بترقية خطتك لإنشاء المزيد.",
        missing_dashscope_endpoint: "عنوان DashScope مفقود. أضف VITE_DASHSCOPE_ENDPOINT إلى ملف .env.",
      },
    },
    store: {
      title: "المتاجر",
      promo_prefix: "يمكنك الحصول على خصم على جميع علاماتك التجارية المفضلة الآن، عندما",
      promo_highlight: "تثبّت التطبيق!",
      search_placeholder: "بحث",
      filters: "الفلاتر",
      brands: "العلامات التجارية",
      colors: "الألوان",
      season: "الموسم",
      categories: "الفئات",
      reset_all: "إعادة تعيين الكل",
      price_range: "نطاق السعر",
      seasons: {
        summer: "الصيف",
        spring: "الربيع",
        fall: "الخريف",
        winter: "الشتاء",
      },
      category_options: {
        dress: "فستان",
        top: "علوي",
        bottom: "سفلي",
      },
      brand_options: {
        hm: "إتش آند إم",
        zara: "زارا",
      },
      product: {
        view: "عرض",
        brand: "العلامة",
        try_on: "جرب افتراضياً",
        wishlist_aria: "أضف إلى المفضلة",
        remove_wishlist_aria: "إزالة من المفضلة",
        view_on_store: "عرض في المتجر",
      },
      currency: "ج.م",
    },
    wishlist: {
      title: "المفضلة",
      subtitle_prefix: "احفظ القطع التي تحبها وعد إليها في أي وقت عندما",
      subtitle_highlight: "تضيف منتجاً إلى المفضلة!",
      loading: "جاري تحميل المفضلة…",
      empty: "لا توجد عناصر تطابق الفلاتر.",
      empty_lonely: "مفضلتك فارغة.",
      no_matches: "لا توجد عناصر في المفضلة تطابق بحثك أو فلاترك.",
    },
    
  pricing: {
      title: "اختر خطتك المفضلة للبدء",
      subtitle: "اختر الخطة التي تناسب احتياجاتك وتطلعاتك في عالم الموضة",
      monthlyToggle: "شهرياً",
      yearlyToggle: "سنوياً",
      completeSubscription: "إتمام الاشتراك",
      free: {
        name: "الأساسية",
        price: "0",
        priceUnit: "/شهرياً",
        features: [
          "مزامنة خزانة الملابس بالذكاء الاصطناعي",
          "كتيب إطلالات يومي (3 إطلالات)",
          "تجربة افتراضية أساسية للملابس",
        ],
        button: "خطة الحالية",
      },
      pro: {
        name: "الخطة الاحترافية",
        price: "19.99",
        priceUnit: "/شهرياً",
        yearlyPrice: "16.19",
        yearlyPriceUnit: "/شهرياً (تُدفع سنوياً)",
        features: [
          "إلغاء في أي وقت، بدون التزامات",
          "تنبيهات تذكيرية للفترة التجريبية عبر البريد الإلكتروني",
          "تحميل غير محدود للرسائل وتنسيقات الملابس",
          "توليد صور متقدمة وعالية الدقة بالذكاء الاصطناعي",
        ],
        button: "اشترك في الخطة الاحترافية",
        breakdown: {
          monthlySub: "اشتراك شهري",
          annualSub: "اشتراك سنوي",
          discount: "خصم التسجيل المبكر",
          tax: "الضريبة المضافة التقريبية",
          due: "المستحق اليوم",
          terms:
            "بالاشتراك، أنت توافق على شروط الخدمة وسياسة الخصوصية الخاصة بـ ReDolapy.",
        },
      },
    },
  brands: {     "viewAll": "عرض الكل",
    title: "شركاء علامتنا التجارية:",
    subtitle: "اكتشف وتسوق من متاجر الأزياء المفضلة لديك بخصومات حصرية فقط على",
    appName: "تطبيق ReDolapy.",
    hm: {
      title: "اتش آند ام",
      description: "اكتشف قطعك المفضلة في اتش آند ام واحصل على الخصم لما تحبه من خلال التطبيق"
    }
  },
    faq: {
      title: "الأسئلة الشائعة",
      questions: [
        {
          title: "كيف يعرف الذكاء الاصطناعي مقاسي؟",
          answer:
            "يحلل نظام الذكاء الاصطناعي المتقدم قياسات جسمك باستخدام معايير موحدة أو مسح صورة سريع للمقارنة مع جداول المقاسات العالمية عبر العلامات التجارية المختلفة بسلاسة.",
        },
        {
          title: "هل يمكنني استخدام ريدولابي مع ملابسي الحالية؟",
          answer:
            "نعم! يمكنك التقاط صور قطع الملابس الموجودة لديك، وسيقوم نظامنا بفهرستها فوراً وإنشاء كتب إطلالات جديدة وتوصيات أسلوب مخصصة لك.",
        },
        {
          title: "كيف يمكنني تجربة الملابس إذا لم أرغب في تحميل صورتي؟",
          answer:
          "تقدم ReDolapy خدمة تجربة الملابس افتراضياً باستخدام صورة رمزية مطابقة لك تماماً، وذلك بمجرد ضبط إعداداتها لتكون مطابقة لك."
        },
      ],
    },

    recycle: {
      header_title: "مولد تصاميم إعادة التدوير من ري دولابي",
      header_subtitle: "ارفع قطع ملابسك · اختر تصميماً · شاهده ينبض بالحياة",

      steps: {
        upload: "رفع الملابس",
        upload_subtitle: "ارفع صورة أو صورتين للقطعة",
        choose: "اختيار الفكرة",
        choose_subtitle: "اختر التصميم المفضل لديك",
        result: "التوليد",
        result_subtitle: "شاهد قطعتك المعاد تدويرها",
      },

      upload: {
        title: "ارفع قطع الملابس الخاصة بك",
        support_text:
          "صيغ الملفات المدعومة: JPG، PNG، WEBP (الحد الأقصى ١٠ ميجابايت لكل صورة)",
        drag_prompt: "اضغط هنا أو اسحب الصور إلى هذا المربع",
        piece_prefix: "قطعة",
        button: "اكتشف أفكار التصميم",
        loading: "جاري ابتكار أفكار التصميم الخاصة بك...",
        warnings: {
          format_error: "صيغة الملف غير مدعومة. يرجى استخدام",
          max_files: "لا يمكنك رفع أكثر من صورتين فقط.",
          size_limit: "يجب أن يكون حجم كل صورة ١٠ ميجابايت أو أقل.",
        },
      },

      ideas: {
        title: "اختر فكرة الأسلوب",
        badge: "مقترح بالذكاء الاصطناعي",
        ai_engine: "محرك الذكاء الاصطناعي",
        aspect_ratio: "نسبة العرض إلى الارتفاع",
        submit: "توليد التصميم المختار",
        loading: "جاري التوليد...",
      },

      card: {
        see_more: "عرض المزيد",
        see_less: "عرض أقل",
        selected: "محدد",
        remove_piece: "إزالة القطعة {n}",
      },

      output: {
        heading: "تصميمك المُولَّد",
        save_btn: "حفظ المواصفات",
        saving: "جاري التحميل...",
      },

  errors: {
    upload_first: 'يرجى رفع قطع الملابس واكتشاف أفكار التصميم أولاً.',
    save_failed: 'فشل تحميل الصورة.',
    login_required: 'يرجى تسجيل الدخول لتحليل الملابس وتوليد التصاميم.',
    missing_github_key: 'مفتاح GitHub API مفقود. أضف VITE_GITHUB_TOKEN إلى ملف .env.',
    missing_dashscope_key: 'مفتاح DashScope API مفقود. أضف VITE_DASHSCOPE_API_KEY إلى ملف .env.',
  },
},
    aboutRecycle: {
      header_primary: "لماذا إعادة التدوير مهمة؟",
      header_gradient: "الموضة المستدامة",
      header_description:
        "اكتشف كيف يمكن تحويل الملابس القديمة إلى قطع جديدة أن يوفر الموارد، يقلل النفايات، وينعش خزانة ملابسك بالأناقة.",
      header_cta: "اعرف المزيد",
      btn_see_how_to_recycle: "انظر كيفية إعادة التدوير",
      title: "لماذا إعادة التدوير مهمة؟",
      subtitle: "تغييرات صغيرة اليوم، تأثير كبير غداً.",
      cards_section_description:
        "اكتشف كيف يمكن لخيارات خزانة الملابس البسيطة أن تؤدي إلى فوائد بيئية كبيرة.",
      saveWater: {
        title: "توفير المياه",
        description: "تستخدم إعادة التدوير مياهاً أقل بكثير",
      },
      saveMoney: {
        title: "توفير المال",
        description: "جدد أسلوبك الشخصي واحصل على",
      },
      reduceWaste: {
        title: "تقليل النفايات",
        description: "أبقِ الملابس بعيداً عن مدافن النفايات و",
      },
      examples: {
        title: "شاهد ما يمكن للذكاء الاصطناعي أن ينشئه",
        subtitle: "من القديم إلى الجديد — إمكانيات إبداعية لا نهاية لها.",
        denimBag: "حقيبة الجينز",
        oldJeans: "جينز قديم",
      },
      example1_description:
        "حوّل جاكيت الجينز القديم إلى حقيبة جديدة بتصميم عصري.",
      example2_description:
        "امنح الجينز المهترئ حياة ثانية كإكسسوار معاد تدويره.",
      example3_title: "تجديد القميص",
      example3_description:
        "حوّل قميصاً قديماً إلى قطعة أنيقة بتفاصيل ونقوش جديدة.",
      how_it_works_title: "كيف تعمل العملية",
      how_it_works_description:
        "اتبع عملية بسيطة من ثلاث خطوات لرفع الملابس، والحصول على أفكار بالذكاء الاصطناعي، وتحويل قطعك إلى أزياء مجددة.",
      uploadProcess: {
        title: "رفع ملابسك",
        description:
          "التقط صور الملابس التي لا ترتديها أو تستخدميها وأضفها إلى أتيليه ريدولابي الرقمي.",
      },
      aiSuggests: {
        title: "الذكاء الاصطناعي يقترح أفكاراً",
        description:
          "يحلل النظام ملابسك ويولد أفكاراً إبداعية مخصصة لإعادة التدوير تناسب أسلوبك.",
      },
      transformReuse: {
        title: "حول وأعد الاستخدام",
        description:
          "جسّد تصميمك الجديد أو تواصل مع المبدعين في سوقنا المنسقة.",
      },
    },
    aboutTryon: {
      header_primary: "اختبر الموضة افتراضياً مع غرفتنا",
      header_gradient: "للقياس بالذكاء الاصطناعي",
      header_description:
        "شاهد كيف تلتف الأزياء، وتتناسب، وتبدو على قوامك الفريد دون الحاجة إلى دخول غرف التبديل التقليدية.",
      header_cta: "جرب افتراضياً الآن",
      see_how_cta: "شاهد طريقة التجربة",

      cards_section_title: "لماذا تستخدم غرفة القياس الافتراضية؟",
      cards_section_description:
        "اكتشف بديلاً متطوراً للتسوق التقليدي يوفر وقتك ويضمن لك تنسيقاً مثالياً للمظهر.",

      card1_title: "تمثيل مرئي فوري",
      card1_description:
        "احصل على عرض ثنائي الأبعاد دقيق لكيفية ظهور النقوش الفاخرة ودرجات الألوان مباشرة على معايير أسلوبك الشخصي.",
      card2_title: "دقة المقاس الحقيقي",
      card2_description:
        "يقوم نظام مطابقة الأبعاد الذكي بربط تصاميم الملابس بهياكل قياسات جسمك بسلاسة تامة.",
      card3_title: "حرية اختيار إبداعية",
      card3_description:
        "امزج وطابق خيارات أسلوب جمالية غير محدودة لخزانتك دون الحاجة لشراء القطع مسبقاً.",

      how_it_works_title: "كيف يعمل النظام؟",
      how_it_works_description:
        "اتبع ثلاث خطوات بسيطة وسريعة لمعاينة أي تصميم ملابس على ملفك الشخصي الافتراضي فوراً.",

      step1_title: "رفع صورة قطعة الملابس",
      step1_description:
        "التقط صورة واضحة أو انسخ رابط أي تصميم لمنتج ملابس ترغب في اختباره.",
      step2_title: "إعداد نموذجك الشخصي",
      step2_description:
        "اختر الصور الرمزية المخصصة لك أو زودنا بلقطة كاملة لمنظور قوامك الطبيعي.",
      step3_title: "توليد المظهر بالذكاء الاصطناعي",
      step3_description:
        "دع معالجنا الذكي يحلل مدخلاتك ليركب لك عرضاً واقعياً للتصميم بشكل فوري وعالي الدقة.",
    },
 auth: {
      tabs: {
        signUp: "إنشاء حساب",
        login: "تسجيل الدخول",
      },
      signup: {
        title: "أنشئ ملفك الشخصي للأزياء",
        subtitle: "ابدأ في بناء خزانة ملابسك المخصصة",
        firstName: "الاسم الأول",
        firstNamePlaceholder: "مثال: إنجي",
        lastName: "الاسم الأخير",
        lastNamePlaceholder: "مثال: أحمد",
        email: "البريد الإلكتروني",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        password: "كلمة المرور",
        passwordPlaceholder: "أنشئ كلمة مرور قوية",
        confirmPassword: "تأكيد كلمة المرور",
        confirmPasswordPlaceholder: "أكد كلمة المرور التي أنشأتها",
        submit: "التالي",
        loading: "يرجى الانتظار...",
        switchText: "لديك حساب بالفعل؟",
        switchLink: "سجل دخولك الآن",
        successMessage:
          "لقد أرسلنا بريدًا إلكترونيًا للتحقق من حسابك. افحص صندوق الوارد الخاص بك.",
      },
      login: {
        title: "مرحباً بعودتك",
        subtitle: "قم بتسجيل الدخول إلى حسابك",
        email: "البريد الإلكتروني",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        password: "كلمة المرور",
        passwordPlaceholder: "أدخل كلمة المرور الخاصة بك",
        forgotPassword: "هل نسيت كلمة المرور؟",
        submit: "تسجيل الدخول",
        loading: "يرجى الانتظار...",
        switchText: "ليس لديك حساب؟",
        switchLink: "أنشئ حساباً الآن",
      },
      panel: {
        emailTitle: "لا تقلق،",
        welcomeBack: "مرحباً بك <br/>من جديد",
        welcomeTo: "مرحباً بك في <br/>ريدولابي",
        noAccount: "ليس لديك حساب؟",
        alreadyHaveAccount: "لديك حساب بالفعل؟",
        signUp: "إنشاء حساب",
        login: "تسجيل الدخول",
      },
      common: {
        orDivider: "——— أو ———",
        continueWithGoogle: "المتابعة باستخدام Google",
        error: {
          somethingWentWrong: "حدث خطأ ما",
        },
      },
    },
    fp: {
      forgotTitle: "هل نسيت كلمة المرور؟",
      forgotSubtitle: "لا تقلق، أدخل بريدك الإلكتروني أدناه لتلقي رمز التحقق.",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      sending: "جاري الإرسال...",
      next: "التالي",
      hintSpam:
        "تأكد من فحص مجلد الرسائل غير المرغوب فيها (Spam) إذا لم تجد الرمز.",
      or: "أو",
      hintDifferent: "جرّب بريداً إلكترونياً آخر إذا لم تتمكن من العثور عليه.",
      backToLogin: "العودة لتسجيل الدخول",
      verificationTitle: "التحقق من البريد الإلكتروني",
      verificationSubtitle: "لقد أرسلنا رمز تحقق مكوناً من 6 أرقام إلى {email}",
      verifying: "جاري التحقق...",
      verifyContinue: "التحقق والمتابعة",
      didnotReceiveCode: "لم يصلك الرمز؟",
      resendCode: "إعادة إرسال الرمز",
      requestCodeIn: "طلب رمز جديد خلال {timer}",
      setNewPasswordTitle: "تعيين كلمة مرور جديدة",
      setNewPasswordSubtitle: "أنشئ كلمة مرور قوية وفريدة لتأمين حسابك.",
      passwordLabel: "كلمة المرور الجديدة",
      passwordPlaceholder: "أنشئ كلمة مرور قوية",
      confirmPasswordLabel: "تأكيد كلمة المرور الجديدة",
      confirmPasswordPlaceholder: "أكّد كلمة المرور الجديدة",
      securityTip:
        "تأكد من أن كلمة المرور لا تقل عن 8 أحرف وتحتوي على حروف كبيرة وصغيرة.",
      saving: "جاري الحفظ...",
      resetPassword: "إعادة تعيين كلمة المرور",
    },
    upload: {
      piece: "القطعة",
      analyzing: "جاري إنشاء أفكار التصميم...",
      discover: "اكتشف أفكار التصميم",
    },
  
    payment: {
      completeSubscription: "إكمال الاشتراك",
      paymentMethod: "طريقة الدفع",
      cardNumber: "رقم البطاقة",
      dateFormat: "ش/س",
      cvv: "رمز CVV",
      savePayment: "احفظ بيانات الدفع لاستخدام مستقبلي",
    },
    footer: {
      brandName: "ري دولابي",
      tagline:
        "أعد التفكير في خزانة ملابسك. أعد تعريف أسلوبك.",
      platform: "المنصة",
      styleGuide: "دليل الأسلوب",
      tryOn: "التجربة الافتراضية",
      features: "المميزات",
      ContactUs: "تواصل معنا",
      telegram: "تيليجرام",
      copyright: "© ٢٠٢٦ ReDolapy للذكاء الاصطناعي. جميع الحقوق محفوظة.",
      privacyPolicy: "سياسة الخصوصية",
    },
    auth: {
      tabs: {
        signUp: "إنشاء حساب",
        login: "تسجيل الدخول",
      },
      signup: {
        title: "أنشئ ملفك الشخصي",
        subtitle: "ابدأ في بناء خزانة ملابس مخصصة لك",
        firstName: "الاسم الأول",
        firstNamePlaceholder: "مثال: إنجي",
        lastName: "اسم العائلة",
        lastNamePlaceholder: "مثال: أحمد",
        email: "البريد الإلكتروني",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        password: "كلمة المرور",
        passwordPlaceholder: "أنشئ كلمة مرور قوية",
        confirmPassword: "تأكيد كلمة المرور",
        confirmPasswordPlaceholder: "أكد كلمة المرور التي أنشأتها",
        submit: "التالي",
        loading: "يرجى الانتظار...",
        switchText: "هل لديك حساب بالفعل؟",
        switchLink: "سجّل الدخول الآن",
        successMessage:
          "لقد أرسلنا بريدًا إلكترونيًا للتحقق من حسابك. تحقق من صندوق الوارد.",
      },
      login: {
        title: "مرحبًا بعودتك",
        subtitle: "سجّل الدخول إلى حسابك",
        email: "البريد الإلكتروني",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        password: "كلمة المرور",
        passwordPlaceholder: "أدخل كلمة المرور",
        forgotPassword: "نسيت كلمة المرور؟",
        submit: "تسجيل الدخول",
        loading: "يرجى الانتظار...",
        switchText: "ليس لديك حساب؟",
        switchLink: "سجّل الآن",
      },
      panel: {
        welcomeBack: "مرحبًا<br/>بعودتك",
        welcomeTo: "مرحبًا بك في<br/>Redolapy",
        noAccount: "ليس لديك حساب؟",
        alreadyHaveAccount: "هل لديك حساب بالفعل؟",
        signUp: "إنشاء حساب",
        login: "تسجيل الدخول",
      },
      common: {
        orDivider: "——— أو ———",
        continueWithGoogle: "المتابعة مع Google",
        error: {
          somethingWentWrong: "حدث خطأ ما",
        },
      },
    },
  "contact": {
    "titlePart1": "تواصل مع",
    "titlePart2": "فريق ReDolapy",
    "description": "لديك سؤال، فكرة شراكة، أو تريد فقط إلقاء التحية؟ اترك لنا رسالة وسنرد عليك في أقرب وقت ممكن.",
    "form": {
      "nameLabel": "الاسم",
      "namePlaceholder": "الاسم بالكامل",
      "emailLabel": "البريد الإلكتروني",
      "emailPlaceholder": "user@gmail.com",
      "messageLabel": "الرسالة",
      "messagePlaceholder": "اكتب رسالتك هنا...",
      "sendButton": "إرسال"
    }
},
    fp: {
      forgotTitle: "هل نسيت كلمة المرور؟",
      forgotSubtitle:
        "لا تقلق! يحدث هذا للجميع. أدخل عنوان البريد الإلكتروني المرتبط بحسابك وسنرسل لك رمزاً لإعادة تعيين كلمة المرور الخاصة بك.",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      sending: "جاري الإرسال...",
      next: "التالي",
      hintSpam:
        "لم يصلك البريد الإلكتروني؟ تحقق من ملف الرسائل غير المرغوب فيها",
      or: "أو",
      hintDifferent: "جرّب عنوان بريد إلكتروني آخر",
      backToLogin: "العودة لتسجيل الدخول",
      verificationTitle: "أدخل رمز التحقق",
      verificationSubtitle:
        "لقد أرسلنا رمزاً مكوناً من 6 أرقام إلى {email}. أدخله أدناه للمتابعة.",
      verifying: "جاري التحقق...",
      verifyContinue: "التحقق والمتابعة",
      didnotReceiveCode: "لم يصلك الرمز؟",
      resendCode: "إعادة إرسال الرمز",
      requestCodeIn: "إعادة طلب الرمز خلال {timer}",
      setNewPasswordTitle: "تعيين كلمة مرور جديدة",
      setNewPasswordSubtitle:
        "اختر كلمة مرور فريدة وقوية لم تستخدمها من قبل لهذا الحساب.",
      passwordLabel: "كلمة المرور",
      passwordPlaceholder: "أنشئ كلمة مرور قوية",
      confirmPasswordLabel: "تأكيد كلمة المرور",
      confirmPasswordPlaceholder: "تأكيد كلمة المرور التي أنشأتها",
      securityTip:
        "استخدم 8 أحرف أو أكثر تحتوي على أحرف وأرقام ورموز للحصول على كلمة مرور أقوى.",
      saving: "جاري الحفظ...",
      resetPassword: "إعادة تعيين كلمة المرور",
      strength: {
        none: "",
        weak: "ضعيفة ❌",
        fair: "مقبولة ⚠️",
        good: "جيدة 👍",
        strong: "قوية جداً 💪",
      },
      panel: {
        emailTitle: "لا تقلق،",
        emailSubtitle:
          "سنساعدك على استعادة الوصول إلى ملفك الشخصي بأمان في غضون ثوانٍ.",
        otpTitle: "تحقق من بريدك",
        otpSubtitle: "تم إرسال رمز أمان للتحقق من هويتك وتأمين حسابك.",
        resetTitle: "تأمين الحساب",
        resetSubtitle:
          "أوشكت على الانتهاء! قم بتعيين بيانات الاعتماد الجديدة للعودة إلى حسابك.",
      },
    },
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
