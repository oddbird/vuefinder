import 'util';

const isDev = (process.env.DEPLOY_ENV === 'PROD') ? false : true;
const domain = 'talks.oddbird.net';
const httpUrl = `http://${domain}`;
const siteDesc = 'Details and slides from OddBird presentations';
const siteImage = {
  src: '/images/_oddbird/social.jpg',
  height: '498',
  width: '1230',
};

const authors = {
  miriam: {
    name: 'Miriam Suzanne',
    url: 'http://oddbird.net/authors/miriam',
    twitter: 'mirisuzanne',
    facebook: 'mirisuzanne',
  }
};

module.exports = {
  loading: false,
  head: {
    title: 'OddTalks',
    meta: [
      // GLOBAL
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { property: 'fb:app_id', content: '1820980378150914' },
      { property: 'og:site_name', content: 'OddTalks' },
      { name: 'twitter:site', content: '@oddbird' },

      // ALL PAGES
      { hid: 'og_title', property: 'og:title', content: 'Talks by OddBird' },
      { hid: 'og_image', property: 'og:image', content: httpUrl + siteImage.src },
      { hid: 'og_image_height', property: 'og:image:height', content: siteImage.height },
      { hid: 'og_image_width', property: 'og:image:width', content: siteImage.width },
      { hid: 'og_url', property: 'og:url', content: httpUrl },
      { hid: 'og_type', property: 'og:type', content: 'website' },
      { hid: 'twitter_card', property: 'twitter:card', content: 'summary' },
      { hid: 'description', name: 'description', content: siteDesc },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
    watch: ['static/images/**/*.*']
  },

  modules: [
    '@nuxtjs/markdownit',
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: './assets/scss/config/_manifest.scss',
  },

  env: {
    isDev,
    domain,
    httpUrl,
    siteDesc,
    siteImage,
    authors,
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
