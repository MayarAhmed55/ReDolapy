import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    proxy: {
      '/upcycle': 'http://localhost:5000',
      '/generate': 'http://localhost:5000',
      '/models': 'http://localhost:5000',
      '/health': 'http://localhost:5000',
    },
  },
});
