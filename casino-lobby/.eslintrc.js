module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
  },
  "rules": {
    "no-console": [2, { allow: ["warn", "error"] }],
    "max-len": [2, 100],
    "linebreak-style": 0,
    "react/require-default-props": 0,
    "jsx-a11y/no-autofocus": 0,
  },
};