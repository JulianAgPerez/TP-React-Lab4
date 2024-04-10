import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
//  base: "https://julianagperez.github.io/TP-React-Lab4/",
  plugins: [react()],
})
