const util = require('util');

// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = (process.env.DEPLOY_ENV === 'GH_PAGES')
  ? { router: {base: '/vuefinder/'} } : {};

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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
      config.module.rules.push({
        test: /\.slides$/,
        loaders: ['raw-loader'],
        exclude: /(node_modules)/
      });
    },
    styleResources: {
      scss: './assets/scss/config/_manifest.scss',
    },
    watch: ['static/images/**/*.*']
  },

  modules: ['@nuxtjs/markdownit'],
  env: {
    baseURL: routerBase.router ? routerBase.router.base : '/',
    domain: process.env.DEPLOY_ENV ? 'miriamsuzanne.com' : 'localhost:3000',
  },

  markdownit: {
    html: true,
    injected: true,
    linkify: true,
    preset: 'commonmark',
    typographer: true,
    use: ['markdown-it-highlightjs', 'markdown-it-attrs']
  }
};
