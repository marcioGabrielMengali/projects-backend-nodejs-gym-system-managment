import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    exclude: ['build/**', 'node_modules/**'],
    include: ['src/**/*.spec.ts'],
    coverage: {
      include: ['src/http/use-cases/**/*.ts'],
      exclude: ['build/**', 'src/http/use-cases/factories/**', 'src/http/use-cases/errors/**']
    }
  }
});
