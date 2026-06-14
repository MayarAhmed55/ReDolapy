import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from '@tailwindcss/vite'

function imageProxyPlugin() {
  return {
    name: 'image-proxy',
    configureServer(server) {
      server.middlewares.use('/image-proxy', async (req, res) => {
        try {
          const requestUrl = new URL(req.url || '', 'http://localhost')
          const target = requestUrl.searchParams.get('url')
          if (!target) {
            res.statusCode = 400
            res.end('Missing url parameter')
            return
          }

          const response = await fetch(decodeURIComponent(target))
          if (!response.ok) {
            res.statusCode = response.status
            res.end('Failed to fetch remote image')
            return
          }

          const contentType = response.headers.get('content-type') || 'application/octet-stream'
          res.setHeader('Content-Type', contentType)
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch {
          res.statusCode = 500
          res.end('Image proxy error')
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(), imageProxyPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        timeout: 300000,
        proxyTimeout: 300000,
      },
    },
  },
});
