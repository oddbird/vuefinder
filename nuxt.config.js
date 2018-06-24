const fs = require('fs');
const matter = require('gray-matter');

const allRouts = [];
const allData = {};

// parse a file for metadata and markdown…
const parseFile = (filePath) => {
  let page = {
    slides: [],
  };

  // get the raw data from the file…
  let pageRaw = fs.readFileSync(filePath, 'utf8');

  // parse…
  pageRaw.split('\n<!-- slide -->\n').forEach(function (partRaw, index) {
    partRaw = partRaw.trimLeft();
    const part = matter(partRaw, { excerpt_separator: '<!-- more -->' });
    part.content = part.content.trimLeft();
    part.excerpt = part.excerpt.trimLeft();

    if (index === 0) {
      page.main = part;
    } else {
      part.id = `slide-${index}`;
      page.slides.push(part);
    }
  });

  return page;
}

const getFiles = (key) => {
  allData[key] = {};
  const dir = `./${key}`;
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const path = `${dir}/${file}`;
    let pageData = parseFile(path);
    pageData.path = path;

    let slug = file.substr(0, file.lastIndexOf('.'));
    rout = `/talks/${slug}`;

    allData[key][slug] = pageData;
    allRouts.push(rout);
  });
}

getFiles('talks');

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

  loading: { color: "#3B8070" },

  generate: {
    routes: allRouts
  },

  env: allData,

  build: {
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

  modules: ["@nuxtjs/markdownit"],

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
  }
};
