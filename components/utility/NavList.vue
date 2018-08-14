<template>
  <nav data-nav="pagelist">
    <div v-for="(list, group) in pages" :key='group'>
      <h2 class="pagelist-title">{{ group }}:</h2>
      <ul class="pagelist-group">
        <li v-for="(page, index) in list"
          :key="index"
          class="pagelist-page" >
          <nuxt-link :to="page.path">{{ page.data.title }}</nuxt-link>
          <div v-if="page.excerpt"
            class="page-excerpt"
            v-html="$md.render(page.excerpt)" />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import matter from 'gray-matter';
  import designSystems from '~/assets/md/talks/design-systems.slides';
  import dynamicCSS from '~/assets/md/talks/dynamic-css.slides';
  import sideSaddle from '~/assets/md/books/ridingsidesaddle.slides';

  export default {
    data() {
      const pages = {
        'design-systems': designSystems,
        'dynamic-css': dynamicCSS,
        'ridingsidesaddle': sideSaddle,
      };

      return {
        pages: this.get(pages),
      };
    },
    methods: {
      get(pages) {
        const data = {};

        for (const path in pages) {
          if (pages.hasOwnProperty(path)) {
            const src = pages[path];
            const metaSrc = src.slice(0, src.indexOf('<!-- slide -->'));
            const meta = matter(metaSrc, {
              excerpt_separator: "<!-- more -->"
            });

            meta.path = path;

            if (!data[meta.data.type]) {
              data[meta.data.type] = [];
            }

            data[meta.data.type].push(meta);
          }
        }

        return data;
      }
    },
  }
</script>

<style lang="scss">
.pagelist-title {
  margin-top: size('newline');
  text-transform: capitalize;
}

.pagelist-group {
  margin-bottom: size('newline');
}

.pagelist-page {
  margin: size('halfline') 0;
}

.page-excerpt {
  font-size: size('xsmall');
}
</style>
