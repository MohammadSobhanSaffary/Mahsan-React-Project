import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: true,
  //   cors: false,
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:5000",
  //       // changeOrigin: true,
  //       // secure: false,
  //     },
  //   },
  // },
});
