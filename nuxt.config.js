const fs = require("fs");

const getRoutes = keys => {
  const mdRoutes = [];

  keys.forEach(key => {
    const dir = `./static/md/${key}`;
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const slug = file.substr(0, file.lastIndexOf("."));
      mdRoutes.push(`/${key}/${slug}`);
    });
  })

  return mdRoutes;
};

mdRoutes = getRoutes(["books", "talks", "plays"]);

module.exports = {
  head: {
    title: "nuxt-slides",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Slideshows in nuxt" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  loading: false,

  generate: {
    routes: mdRoutes
  },

  env: {
    mdRoutes: mdRoutes
  },

  css: [
    '~/assets/scss/slide-talks.scss'
  ],

  build: {
    vendor: ["~/assets/parser", "lodash"],
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },

  modules: ["@nuxtjs/axios", "@nuxtjs/markdownit"],

  markdownit: {
    html: true,
    injected: true,
    linkify: true,
    preset: "commonmark",
    typographer: true,
    use: [
      "markdown-it-attrs",
      ["markdown-it-container", "two-up"],
      "markdown-it-emoji",
      "markdown-it-highlightjs"
    ]
  }
};
