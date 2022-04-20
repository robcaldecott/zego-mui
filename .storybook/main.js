const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-dark-mode",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  reactOptions: {
    fastRefresh: true,
  },
  staticDirs: ["../public"],
  webpackFinal: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "../src");
    config.resolve.alias["@emotion/core"] = path.resolve(
      __dirname,
      "../node_modules/@emotion/react"
    );
    config.resolve.alias["emotion-theming"] = path.resolve(
      __dirname,
      "../node_modules/@emotion/react"
    );
    return config;
  },
  babel: async (options) => {
    return {
      ...options,
      plugins: [...options.plugins, "macros"],
      babelrc: false,
    };
  },
};
