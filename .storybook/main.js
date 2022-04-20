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
    builder: "@storybook/builder-vite",
  },
  reactOptions: {
    fastRefresh: true,
  },
  staticDirs: ["../public"],
  async viteFinal(config, { configType }) {
    config.plugins = [
      ...config.plugins.filter((plugin) => {
        return !(
          Array.isArray(plugin) && plugin[0].name === "vite:react-babel"
        );
      }),
      require("@vitejs/plugin-react")({
        exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
        babel: { plugins: ["macros"] },
      }),
    ];
    // config.optimizeDeps = {
    //   ...(config.optimizeDeps || {}),
    //   include: [
    //     ...(config?.optimizeDeps?.include || []),
    //     // Imports from preview.tsx
    //     "msw-storybook-addon",
    //     "storybook-dark-mode",
    //     "storybook-addon-intl",
    //   ],
    // };
    config.resolve = {
      ...config.resolve,
      alias: {
        "@": path.resolve(__dirname, "../src"),
        "@emotion/core": path.resolve(
          __dirname,
          "../node_modules/@emotion/react"
        ),
        "emotion-theming": path.resolve(
          __dirname,
          "../node_modules/@emotion/react"
        ),
      },
    };
    return config;
  },
};
