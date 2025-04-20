import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://your-portfolio-domain.com',
  integrations: [],
  vite: {
    ssr: {
      noExternal: ['three']
    }
  }
});