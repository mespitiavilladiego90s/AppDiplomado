import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'

// Configura dotenv para cargar variables de entorno
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
