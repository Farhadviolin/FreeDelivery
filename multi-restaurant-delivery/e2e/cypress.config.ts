import { defineConfig } from 'cypress';
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'e2e/support/index.ts',
    specPattern: 'e2e/tests/**/*.spec.ts'
  }
});
