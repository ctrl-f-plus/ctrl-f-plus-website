// prettier.config.js

module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['tw', 'clsx', 'cx', 'cva'],
  singleQuote: true,
  overrides: [
    { files: '*.html', options: { printWidth: 100 } },
    { files: '*.jsonc', options: { trailingComma: 'none' } },
  ],
};
