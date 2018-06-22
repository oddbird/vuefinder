module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "nuxt-slides",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Slideshows in nuxt" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
      config.node = {
        fs: 'empty'
      }
    }
  },

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/markdownit",
  ],

  markdownit: {
    html: "true",
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
  },
};
