const withPWA = require("next-pwa");
const withTM = require("next-transpile-modules")([
  "@tldraw/tldraw",
  "@tldraw/core",
]);

const {
  GITHUB_ID,
  GITHUB_API_SECRET,
  NODE_ENV,
  VERCEL_GIT_COMMIT_SHA,
  GA_MEASUREMENT_ID,
} = process.env;

const isProduction = NODE_ENV === "production";

const basePath = "";

module.exports = withPWA(
  withTM({
    reactStrictMode: true,
    pwa: {
      disable: !isProduction,
      dest: "public",
    },
    productionBrowserSourceMaps: true,
    env: {
      NEXT_PUBLIC_COMMIT_SHA: VERCEL_GIT_COMMIT_SHA,
      GA_MEASUREMENT_ID,
      GITHUB_ID,
      GITHUB_API_SECRET,
    },
    webpack: (config, options) => {
      config.plugins.push(
        new options.webpack.DefinePlugin({
          "process.env.NEXT_IS_SERVER": JSON.stringify(
            options.isServer.toString()
          ),
        })
      );

      config.module.rules.push({
        test: /.*packages.*\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
      });

      return config;
    },
  })
);
