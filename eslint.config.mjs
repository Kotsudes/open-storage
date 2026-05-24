import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export const baseConfig = defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,tsx}"],
        plugins: { js },
        extends: [js.configs.recommended],
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
        ignores: [
            "coverage",
            "**/public",
            "**/dist",
            "pnpm-lock.yaml",
            "pnpm-workspace.yaml",
            ".next",
        ],
    },

    tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
]);

export default baseConfig;
