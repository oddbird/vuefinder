const webpack = require('webpack');
const fs = require("fs");
const path = require("path");

// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES'
  ? { router: {base: '/vuefinder/'} } : {};

const getFilePaths = (dir) => {
  return fs
    .readdirSync(dir)
    .reduce((files, file) => {
      const name = path.join(dir, file);
      const isDirectory = fs.statSync(name).isDirectory();
      return isDirectory ? [...files, ...getFilePaths(name)] : [...files, name];
    }, []).map(file => file.replace('static/', ''));
}

const buildRoute = (file) => {
  return file.slice(file.lastIndexOf('/') + 1, file.lastIndexOf('.'));
}

const allRoutes = (dir) => {
  const routes = {};

  getFilePaths(dir).forEach(file => {
    routes[buildRoute(file)] = file;
  });

  return routes;
}

const mdRoutes = allRoutes('static/md');

module.exports = {
  ...routerBase,
  loading: false,
  css: ['~/assets/scss/vuefinder.scss'],
  head: {
    title: 'vuefinder',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Slideshows in nuxt' }
    ],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700,700i'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Source+Code+Pro:400,600'
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  generate: {
    routes: Object.keys(mdRoutes)
  },

  env: {
    mdRoutes: mdRoutes
  },

  build: {
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ],
    vendor: ['~/assets/parser'],
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    },
    watch: ['static/md/**/*.md', 'static/images/**/*.*']
  },

  modules: ['@nuxtjs/axios', '@nuxtjs/markdownit'],

  markdownit: {
    html: true,
    injected: true,
    linkify: true,
    preset: 'commonmark',
    typographer: true,
    use: ['markdown-it-highlightjs', 'markdown-it-attrs']
  }
};
