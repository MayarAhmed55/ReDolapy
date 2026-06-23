/** Production uses Vercel rewrite (/api → Cloud Run). Dev uses Vite proxy. */
// const API_BASE =
//   import.meta.env.VITE_API_BASE ||
//   (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api')

// export default API_BASE
// export { API_BASE }


// config/api.js

// Use this for axios calls (handles rewrites/proxies)
export const API_BASE = import.meta.env.VITE_API_BASE || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

// Use this strictly for the Google Popup (must be absolute)
export const AUTH_BASE = import.meta.env.PROD 
  ? 'https://tryon-backend-187701052725.us-central1.run.app' // Your actual Cloud Run URL
  : 'http://localhost:5000';

export default API_BASE;