import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import eslintPluginPrettier from "eslint-plugin-prettier/recommended"

export default tseslint.config(
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  pluginJs.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: true,
        projectService: {
          allowDefaultProject: ["eslint.config.js", "vite.config.js"],
        },
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "error",
    },
  },
  eslintPluginPrettier,
)
