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
    styleResources: {
      scss: './assets/scss/config/_manifest.scss',
    },
    watch: ['static/images/**/*.*']
  },

  modules: ['@nuxtjs/markdownit'],
  env: {
    baseURL: routerBase.router ? routerBase.router.base : '/',
    domain: process.env.DEPLOY_ENV ? 'miriamsuzanne.com' : 'localhost:3000',
    authors: {
      miriam: {
        name: 'Miriam Suzanne',
        url: 'http://miriamsuzanne.com/',
        org: '@mirisuzanne',
        org_url: 'http://twitter.com/mirisuzanne',
        logo: '/images/_template/face.svg'
      },
      oddbird: {
        name: 'Miriam Suzanne',
        url: 'http://oddbird.net/authors/miriam',
        org: 'OddBird',
        org_url: 'http://oddbird.net/',
        logo: '/images/_template/oddlogo.svg'
      }
    }
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
