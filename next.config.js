const withCSS = require('@zeit/next-css');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = withCSS({
  webpack(config) {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    config.plugins.push(
      new WorkboxPlugin.GenerateSW({
        swDest: 'service-worker.js',
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: /upcoming/,
            handler: 'networkFirst',
            options: {
              networkTimeoutSeconds: 5,
              cacheName: 'upcoming-movie-cache',
            },
          },
          {
            urlPattern: /append_to_response=credits/,
            handler: 'staleWhileRevalidate',
            options: {
              cacheName: 'movie-details-cache',
            },
          },
          {
            urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
            handler: 'cacheFirst',
            options: {
              cacheName: 'image-cache',
            },
          },
        ],
      })
    );

    return config;
  },
});
