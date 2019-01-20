<template>
  <main data-layout="compare">
    <template v-for="index in en.slides.length">
      <div :data-en="index" :key="`${index}-en`">
        <div class="content"
          v-html="en.slides[index - 1].content || en.slides[index].data.alt || 'none'" />
        <ul v-if="en.slides[index - 1].data.tags"
          class="tags">
          <li v-for="tag in en.slides[index - 1].data.tags"
            :key="tag">
            #{{ tag }}
          </li>
        </ul>
      </div>
      <div :data-es="index" :key="`${index}-es`">
        <div class="content"
          v-html="es.slides[index - 1].content || es.slides[index].data.alt || 'none'" />
        <ul v-if="es.slides[index - 1].data.tags"
          class="tags">
          <li v-for="tag in es.slides[index - 1].data.tags"
            :key="tag">
            #{{ tag }}
          </li>
        </ul>
      </div>
    </template>
  </main>
</template>

<script>
  import matter from 'gray-matter';
  import typogr from 'typogr';
  import en from '~/assets/slides/en.slides';
  import es from '~/assets/slides/es.slides';

  export default {
    data() {
      return {
        en: this.parse(en),
        es: this.parse(es),
      };
    },
    methods: {
      parse(src) {
        const md = this.$md;
        const data = {
          slides: [],
        };

        // parse
        src.split("\n<!-- slide -->\n").forEach(function (partRaw, index) {
          partRaw = partRaw.trimLeft();

          const part = matter(partRaw, { excerpt_separator: "<!-- more -->" });
          part.content = typogr.typogrify(md.render(part.content.trimLeft()));

          if (index === 0) {
            data.meta = part.data;
            data.content = part.content;
            data.excerpt = part.excerpt;
          } else {
            part.id = `slide-${index}`;
            data.slides.push(part);
          }
        });

        // defaults
        data.meta.views = data.meta.views || ['grid', 'list', 'slides'];
        data.meta.view = data.meta.view || data.meta.views[0];
        data.meta.type = data.meta.type || 'talks';
        data.meta.demos = this.demos;

        return data;
      },
    },
  }
</script>

<style lang="scss">
@import '~/assets/scss/base/_manifest.scss';

[data-layout='compare'] {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: size('gutter');
  margin: 0 auto;
  max-width: size('double');
}

[data-en],
[data-es] {
  border-top: 1px solid color('border');
  display: grid;
  grid-template-rows: 1fr auto;
  padding: size('gutter');
}

.content {
  padding-top: size('shim');

  p,
  ol,
  ul {
    margin-bottom: size('shim');
  }
}

.tags {
  display: flex;
  list-style: none;

  li {
    display: inline-block;
    padding-right: size('half-shim');
  }
}

[data-en] {
  grid-column: 1;
}

[data-es] {
  grid-column: 2;
}
</style>
