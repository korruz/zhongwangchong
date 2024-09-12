import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      root: path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "./dist",
  },
  server: {
    middleware: {
      async handle(request, response, next) {
        if (request.Methods === "OPTIONS") {
          response.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Headers":
              "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Expose-Headers": "*",
            "Access-Control-Max-Age": "86400",
          });
          response.end();
        } else {
          next();
        }
      },
    },
    proxy: {
      "/api2": {
        target: "https://wx.hychong.com",
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api2/, "");
        },
      },
      "/api1": {
        target: "https://wx.jwnzn.com",
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api1/, "");
        },
      },
    },
  },
});
