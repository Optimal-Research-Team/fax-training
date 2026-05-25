import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the static bundle works on Vercel, GitHub Pages
// subpaths, or any internal host without reconfiguration.
export default defineConfig({
  base: './',
  plugins: [react()],
});
