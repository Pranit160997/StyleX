import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import 'dotenv/config'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target:process.env.TARGET,
        /* target:'http://localhost:5000', */
        secure: false,
        changeOrigin: true,
      },
    },
  },

  plugins: [react()],
});
