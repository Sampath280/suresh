import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

const target = process.env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${process.env.ASPNETCORE_HTTPS_PORT}`
  : process.env.ASPNETCORE_URLS?.split(';')[0] || 'https://localhost:7012';

export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    proxy: {
      '^/experience': {
        target,
        secure: false,
      },
      '^/about': {
        target,
        secure: false,
      },
    },
    port: 5173,
  },
  build: {
    outDir: 'dist', // This should match output_location in GitHub Actions
  },
});
