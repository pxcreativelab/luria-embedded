import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dts from "vite-plugin-dts";

// Configuração otimizada para build do Luria Embedded
export default defineConfig(() => {
  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        outDir: 'dist/embedded',
        include: ['../src/embedded/**/*'],
        exclude: ['../src/embedded/**/*.stories.tsx', '../src/embedded/**/*.test.tsx'],
        logLevel: 'error' // Apenas erros
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "../src"),
      },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    build: {
      outDir: 'dist/embedded',
      lib: {
        entry: path.resolve(__dirname, '../src/embedded/index.ts'),
        name: 'LuriaEmbedded',
        fileName: (format) => `luria-embedded.${format}.js`,
        formats: ['umd', 'es']
      },
      minify: 'esbuild', // Usar esbuild para ser mais rápido
      sourcemap: false, // Desabilitar sourcemap para acelerar
      cssCodeSplit: false,
      chunkSizeWarningLimit: 2000, // Aumentar limite de warning
      emptyOutDir: true, // Limpar diretório de saída
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react-router-dom',
          '@tanstack/react-query',
          'axios',
          'i18next',
          'react-i18next'
        ],
        output: {
          assetFileNames: 'luria-embedded.[ext]',
          globals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM',
            '@tanstack/react-query': 'ReactQuery',
            'axios': 'axios',
            'i18next': 'i18next',
            'react-i18next': 'reactI18next'
          },
          exports: 'named'
        }
      }
    },
    css: {
      postcss: '../postcss.config.js'
    },
    // Otimizações para CI
    optimizeDeps: {
      include: ['react', 'react-dom']
    },
    esbuild: {
      target: 'es2020'
    }
  };
}); 