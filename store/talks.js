const fs = require("fs");
const matter = require("gray-matter");

export const state = () => ({
  list: [],
  fetched: false,
});

export const mutations = {
  set(state, todos) {
    state.list = todos;
    state.fetched = true;
  },
};

export const actions = {
  async fetchTalks({ commit }) {
    const readFiles = await function (dirname, onFileContent, onError) {
      fs.readdir(dirname, function (err, filenames) {
        if (err) {
          onError(err);
          return;
        }
        filenames.forEach(function (filename) {
          fs.readFile(dirname + filename, "utf-8", function (err, content) {
            if (err) {
              onError(err);
              return;
            }
            onFileContent(filename, content);
          });
        });
      });
    };

    const { data } = {}

    readFiles(
      "../talks/",
      function (filename, content) {
        let meta = {};
        let page = [];

        content.split('\n<!-- slide -->\n').forEach(function (partRaw, index) {
          partRaw = partRaw.trimLeft();
          const bits = matter(partRaw, { excerpt_separator: '<!-- more -->' });
          bits.id = index;
          bits.content = app.$md.render(bits.content.trimLeft());
          bits.excerpt = app.$md.render(bits.excerpt.trimLeft());

          if (bits.id === 0) {
            meta = bits;
            meta.title = meta.data.title ?
              app.$md.render('# ' + meta.data.title) : '';
            meta.subtitle = meta.data.subtitle ?
              app.$md.render('# ' + meta.data.subtitle) : '';
          } else {
            page.push(bits);
          }
        });

        data[filename] = {
          page: page,
          meta: meta,
        };
      },
      function (err) {
        throw err;
      }
    );

    commit('set', data);
  },
}

export const getters = {
  talkByPath: (state) => (path) => {
    return state.list[path];
  },
  isFetched: state => {
    return !!state.fetched;
  },
}
