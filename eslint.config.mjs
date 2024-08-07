import globals from "globals";
import tseslint from "typescript-eslint";
import tsParser from "typescript-eslint";
import htmlPlugin from "eslint-plugin-html";


export default [
  {
    ignores: ['node_modules/', '.angular/'],
  },
  {
    files: ["**/*.{ts,html}"],
    languageOptions: {
      parser: tsParser,
      globals: globals.node,
    },
    plugins: {
      html: htmlPlugin,
    }
  },
  {languageOptions: {globals: globals.node}},
  ...tseslint.configs.recommended,
];
