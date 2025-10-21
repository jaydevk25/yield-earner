import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',       // ensures Vite uses project root
  build: {
    outDir: 'dist',
  },
});
