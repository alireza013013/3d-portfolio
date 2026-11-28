import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl';


// https://vite.dev/config/
export default defineConfig({
   server: {
    host: true,
    port: 5173,
  },
  plugins: [
    glsl(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
