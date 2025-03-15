import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/**@type {import('eslint'.Linter.Config[])} */
export default [
    { files: ["**/*{.js, mjs, cjs, ts}"] },
    { languageOptions: { globals: globals.browser } },
    { languageOptions: { parserOptions: { project: "./tsconfig.json" } } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            /** 🔹 TypeScript-Specific Rules */
            "@typescript-eslint/no-explicit-any": "off", // Warn instead of disabling completely
            "@typescript-eslint/explicit-module-boundary-types": "error", // Require return types in functions
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Warn for unused variables but allow `_` prefixed variables

            /** 🔹 Code Consistency & Best Practices */
            eqeqeq: ["error", "always"], // Enforce strict equality (=== & !==)
            // curly: ["error", "all"], // Require curly braces around blocks
            "no-var": "error", // Disallow var in favor of let/const
            "prefer-const": "error", // Enforce const usage where possible
            "arrow-body-style": ["error", "as-needed"], // Require concise arrow function syntax when possible
        },
    },
];
