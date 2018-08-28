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
  import dynamicCSS from '~/assets/talks/dynamic-css/index.slides';

  export default {
    data() {
      const pages = {
        'dynamic-css': dynamicCSS,
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
