import type { StorybookConfig } from '@storybook/react';
const config: StorybookConfig = {
  stories: ['../packages/ui/src/**/*.stories.@(ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials','@storybook/addon-a11y'],
  framework: '@storybook/react'
};
export default config;
