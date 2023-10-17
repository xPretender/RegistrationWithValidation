import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        'serialport',
        'sqlite3',
        "aws-sdk",
        "nock",
        'mock-aws-s3'
      ]
    }
  },
  plugins: [react()],
})
