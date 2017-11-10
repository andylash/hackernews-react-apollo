module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ["airbnb", "prettier"],
  plugins: ["react", "prettier"],
  env: {
    browser: false /* true just seems to allow sloppy globals like event */,
    node: true,
    es6: true,
  },
  rules: {
    "prettier/prettier": "error",
  },
};
