const withCSS = require('@zeit/next-css');
const WorkboxPlugin = require('workbox-webpack-plugin');
const stringify = require('json-stringify');

module.exports = withCSS({
  webpack(config) {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    if (config.module.rules[2]) {
      config.module.rules[2]['use'] = [
        config.module.rules[2]['use'][0],
        config.module.rules[2]['use'][1],
        config.module.rules[2]['use'][2],
        {
          loader: 'css-purify-webpack-loader',
          options: {
            includes: ['./pages/*.js', './components/*.js'],
            when: true,
          },
        },
      ];
    }

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

    // console.log(stringify(config, null, 2));
    console.log(config.name);

    return config;
  },
});
