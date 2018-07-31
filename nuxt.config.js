const webpack = require('webpack');

// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES'
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
    },
    watch: ['static/md/**/*.md', 'static/images/**/*.*']
  },

  modules: ['@nuxtjs/markdownit'],

  markdownit: {
    html: true,
    injected: true,
    linkify: true,
    preset: 'commonmark',
    typographer: true,
    use: ['markdown-it-highlightjs', 'markdown-it-attrs']
  }
};
