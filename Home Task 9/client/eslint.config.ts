// eslint.config.ts
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier";

export default defineConfig([
  // TypeScript базова конфігурація
  ...tseslint.configs.recommended,

  // JS файли
  {
    files: ["**/*.{js,cjs,mjs}"],
    ...js.configs.recommended,
  },

  // TS файли
  {
    files: ["**/*.{ts,cts,mts}"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier, // ← Додаємо Prettier
    },

    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "off",

      "prettier/prettier": "error",
    },
  },

  {
    ignores: ["node_modules/", "dist/", "build/", "*.d.ts", "coverage/"],
  },
]);
