import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dts from "vite-plugin-dts";

// Configuração específica para build do Luria Embedded
export default defineConfig(({ mode }) => {
  const isES = mode === 'es';
  
  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        outDir: 'dist/embedded',
        include: ['src/embedded/**/*'],
        exclude: ['src/embedded/**/*.stories.tsx', 'src/embedded/**/*.test.tsx']
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    build: {
      outDir: 'dist/embedded',
      lib: {
        entry: path.resolve(__dirname, 'src/embedded/index.ts'),
        name: 'LuriaEmbedded',
        fileName: (format) => `luria-embedded.${format}.js`,
        formats: isES ? ['es'] : ['umd', 'es']
      },
      minify: false, // Desabilitado por enquanto
      sourcemap: true,
      cssCodeSplit: false,
      rollupOptions: {
        external: isES ? [
          'react',
          'react-dom',
          'react-router-dom',
          '@tanstack/react-query',
          'axios',
          'i18next',
          'react-i18next'
        ] : [], // Externalizar apenas para ES modules
        output: {
          assetFileNames: 'luria-embedded.[ext]',
          globals: isES ? {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM',
            '@tanstack/react-query': 'ReactQuery',
            'axios': 'axios',
            'i18next': 'i18next',
            'react-i18next': 'reactI18next'
          } : {},
          // Configurações específicas para formato
          format: isES ? 'es' : 'umd',
          exports: 'named',
          // Garantir que o nome global seja definido corretamente para UMD
          name: isES ? undefined : 'LuriaEmbedded'
        }
      }
    },
    css: {
      postcss: './postcss.config.js'
    }
  };
}); 