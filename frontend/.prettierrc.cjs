module.exports = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  plugins: ["prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.{js,jsx,tsx,ts,scss,json,html}",
      options: {
        tabWidth: 2,
      },
    },
  ],
};
