import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
  // Base JavaScript rules
  js.configs.recommended,
  
  // Next.js configuration
  {
    plugins: {
      "@next/next": next,
    },
    rules: {
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",
      "@next/next/no-sync-scripts": "error",
      "@next/next/no-before-interactive-script-outside-document": "error",
      "@next/next/no-page-custom-font": "warn",
      "@next/next/no-title-in-document-head": "error",
      "@next/next/no-css-tags": "warn",
      "@next/next/no-head-element": "error",
      "@next/next/no-script-component-in-head": "error",
    },
  },
  
  // TypeScript configuration
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  
  // React/JSX configuration
  {
    files: ["**/*.{jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  
  // General rules for all files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  
  // Ignore patterns
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "*.config.js",
      "*.config.ts",
    ],
  },
];