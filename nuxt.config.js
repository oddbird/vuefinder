import 'util';

const isDev = (process.env.DEPLOY_ENV === 'PROD') ? false : true;
const domain = 'read.ridingsidesaddle.com';
const httpUrl = `http://${domain}`;
const siteDesc = 'a novel in fragments';
const siteImage = {
  src: '/images/_brand/social.jpg',
  height: '498',
  width: '1230',
};

const authors = {
  miriam: {
    name: 'Miriam Suzanne',
    url: 'http://miriamsuzanne.com/',
    twitter: 'mirisuzanne',
    facebook: 'mirisuzanne',
  },
  buntport: {
    name: 'Buntport Theater',
    url: 'http://miriamsuzanne.com/',
    twitter: 'mirisuzanne',
    facebook: 'mirisuzanne',
  }
};

module.exports = {
  loading: false,
  head: {
    title: 'Riding SideSaddle*',
    meta: [
      // GLOBAL
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { property: 'og:site_name', content: 'Miriam Suzanne' },
      { name: 'twitter:site', content: '@mirisuzanne' },

      // ALL PAGES
      { hid: 'og_title', property: 'og:title', content: 'Riding SideSaddle*' },
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
