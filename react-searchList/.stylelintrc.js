module.exports = {
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-recommended-less",
    "stylelint-config-prettier"
  ],
  "plugins": [
    "stylelint-less"
  ],
  "overrides": [
    {
      "files": ["*.less", "**/*.less"],
      "customSyntax": "postcss-less"
    }
  ],
  "rules": {
    "indentation":2,
    "function-no-unknown": null,
    "block-opening-brace-newline-after": "always",
    "selector-class-pattern": null,
    "font-family-no-missing-generic-family-keyword": null
  }
}
