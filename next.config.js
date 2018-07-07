const withCSS = require('@zeit/next-css');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { join } = require('path');
// const stringify = require('json-stringify');

const workboxPath = join(__dirname, '.next');

module.exports = withCSS({
  webpack(config, { isServer, buildId }) {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    if (!isServer) {
      config.module.rules[config.module.rules.length - 1].use.push({
        loader: 'css-purify-webpack-loader',
        options: {
          includes: ['./pages/*.js', './components/*.js'],
        },
      });
    }

    if (isServer) {
      config.plugins.push(
        new WorkboxPlugin.GenerateSW({
          clientsClaim: true,
          skipWaiting: true,
          manifestTransforms: [
            originalManifest => {
              const manifest = originalManifest.map(entry => {
                const file = entry.url.split('/').reverse()[0];
                const baseUrl = entry.url.split('/')[2];
                const url = `https://${baseUrl}/_next/${buildId}/page/${file}`;
                return Object.assign({}, entry, { url });
              });
              return { manifest };
            },
          ],
          runtimeCaching: [
            {
              urlPattern: new RegExp('^https://api.themoviedb.org/3/movie'),
              handler: 'staleWhileRevalidate',
              options: {
                cacheName: 'api-cache',
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
              handler: 'cacheFirst',
              options: {
                cacheName: 'image-cache',
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        })
      );
    }

    // console.log(stringify(config, null, 2));
    // console.log(config.name);

    return config;
  },
});
