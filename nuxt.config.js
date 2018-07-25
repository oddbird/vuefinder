const fs = require("fs");
const path = require("path");
const mdPath = "static/md";

const getAllFiles = (dir) => {
  return fs
    .readdirSync(dir)
    .reduce((files, file) => {
      const name = path.join(dir, file);
      const isDirectory = fs.statSync(name).isDirectory();
      return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
    }, [])
    .map(path => path.replace(`${mdPath}/`, '').replace('.md', ''));
}

mdRoutes = getAllFiles(mdPath);

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
