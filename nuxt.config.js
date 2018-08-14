const util = require('util');

let domain = 'localhost:3000';

switch (process.env.DEPLOY_ENV) {
  case 'MIA':
    domain = 'read.miriamsuzanne.com';
    break;
  case 'ODDBIRD':
    domain = 'talks.oddbird.net';
    break;
}

module.exports = {
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
    domain: domain,
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
