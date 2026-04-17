import { builtinModules } from 'node:module';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const external = [
  ...builtinModules,
  ...builtinModules.map((moduleName) => `node:${moduleName}`),
];

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'GhpVsCodeSetup',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external,
    },
    sourcemap: true,
    target: 'node20',
  },
  plugins: [
    dts({
      include: ['src'],
    }),
  ],
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.ts'],
    },
  },
});
