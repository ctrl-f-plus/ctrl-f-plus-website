import nextConfig from 'eslint-config-next/core-web-vitals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['.trash/**/*'] },
  ...nextConfig,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: { project: './tsconfig.json' },
    },
    rules: {},
  },
);
