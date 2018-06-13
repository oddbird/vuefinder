<template>
  <article>
    <header v-if="meta.title" v-html="meta.title + meta.subtitle"></header>

    <section v-for="card in page"
      class="card"
      :key="card.id"
      v-html="card.content"></section>
  </article>
</template>

<script>
  import matter from 'gray-matter';

  export default {
    data() {
      return {
        meta: {},
        page: [],
      }
    },
    async asyncData ({ app, params }) {
      let meta = {};
      let page = [];
      let pageData = await app.$axios.$get(`talk_src/${params.talk}.md`);
      pageData.split('\n<!-- slide -->\n').forEach(function(partRaw, index) {
        partRaw = partRaw.trimLeft();
        const bits = matter(partRaw, {excerpt_separator: '<!-- more -->'});
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
      return {
        page: page,
        meta: meta,
      };
    }
  }
</script>

<style lang="scss">
img {
  max-width: 100%;
}

pre {
  background: #eee;
  overflow-x: auto;
  padding: 1em;
  position: relative;

  &::after {
    background: linear-gradient(to right, transparent, #eee);
    bottom: 0;
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 1em;
  }
}

.two-up {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(30em, 1fr));

  pre {
    margin: 0;
  }
}
</style>
