import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  // 1. Ignore build artifacts and dependencies
  {
    ignores: [".next/**", "node_modules/**", "dist/**"],
  },

  // 2. Base ESLint Recommended
  js.configs.recommended,

  // 3. Next.js & Prettier Config
  // We use compat.config instead of extends to handle the internal naming conflict
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "plugin:prettier/recommended"
    ],
    rules: {
      "prettier/prettier": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    }
  }),

  // 4. Force override for the 'name' issue
  {
    rules: {
      // You can add specific overrides here if needed
    }
  }
];