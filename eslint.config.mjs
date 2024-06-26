import globals from "globals";
import pluginJs from "@eslint/js";
import airbnb from "eslint-config-airbnb";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  airbnb,
  prettier,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "warn",
      "no-unused-vars": "warn",
      "no-console": "off",
      "func-names": "off",
      "object-shorthand": "off",
      "class-methods-use-this": "off",
      "no-plusplus": "off",
      "no-param-reassign": "off",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["**/webpack.*.js"],
        },
      ],
    },
  },
  {
    "extends": [
      "some-other-config-you-use",
      "prettier"
    ]
  }
];