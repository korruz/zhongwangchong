import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      root: path.resolve(__dirname, 'src'),
    }
  },
  build: {
    outDir: './dist'
  },
  server: {
    port: 80,
    proxy: {
      '/api': {
        target: 'http://wx.jwnzn.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
