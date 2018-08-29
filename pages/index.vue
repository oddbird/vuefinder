<template>
  <page-template>
    <article v-for="(talk, path) in talks"
      :key="path">
      <h2>
        <nuxt-link :to="`${path}/`">
          {{ talk.data.title }}
        </nuxt-link>
        {{ talk.data.subtitle }}
      </h2>
      <div v-html="$md.render(talk.excerpt)" />
      <version-list :path="path"
        :versions="talk.data.versions" />
    </article>
  </page-template>
</template>

<script>
  import matter from 'gray-matter';
  import PageTemplate from '~/components/PageTemplate.vue';
  import VersionList from '~/components/project/VersionList.vue';

  // pages
  import dynamicCSS from '~/assets/talks/dynamic-css/index.slides';

  export default {
    components: {
      PageTemplate,
      VersionList,
    },
    data() {
      const talks = {
        'dynamic-css': dynamicCSS,
      };

      return {
        talks: this.get(talks),
      };
    },
    methods: {
      get(talks) {
        const data = {};

        for (const path in talks) {
          if (talks.hasOwnProperty(path)) {
            const talk = matter(talks[path], {
              excerpt_separator: "<!-- more -->"
            });

            data[path] = talk;
          }
        }

        return data;
      }
    },
  }
</script>

<style lang="scss">
@import '~/assets/scss/_vuefinder.scss';

</style>
