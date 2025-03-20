import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/getCode': {
        target: 'http://localhost:3000',  // 伺服器地址
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

