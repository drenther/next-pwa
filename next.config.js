const withCSS = require('@zeit/next-css');
const NextWorkboxPlugin = require('next-workbox-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');
const { join } = require('path');
// const stringify = require('json-stringify');

const workboxPath = join(__dirname, '.next');

module.exports = withCSS({
  webpack(config, { isServer, buildId, dev }) {
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

    const workboxOptions = {
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache',
          },
        },
        {
          urlPattern: /css/,
          handler: 'networkFirst',
          options: {
            cacheName: 'css-cache',
          },
        },
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
    };

    if (!isServer && !dev) {
      config.plugins.push(
        new NextWorkboxPlugin({
          buildId,
          ...workboxOptions,
        })
      );
    }

    // console.log(stringify(config, null, 2));
    // console.log(config.name);

    return config;
  },
});
