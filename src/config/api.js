/** Production uses Vercel rewrite (/api → Cloud Run). Dev uses Vite proxy. */
const API_BASE =
  import.meta.env.VITE_API_BASE ||
  (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api')

export default API_BASE
export { API_BASE }
