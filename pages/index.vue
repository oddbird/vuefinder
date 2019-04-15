<template>
  <page-template>
    <div class="talk-list">
      <article v-for="(talk, path) in talks" :key="path">
        <h2>
          <nuxt-link :to="`${path}/`">{{ talk.data.title }}</nuxt-link>
          {{ talk.data.subtitle }}
        </h2>
        <div v-html="$md.render(talk.excerpt)"/>
        <version-list :path="path" :versions="talk.data.versions"/>
      </article>
    </div>
  </page-template>
</template>

<script>
import matter from "gray-matter";
import PageTemplate from "~/components/PageTemplate.vue";
import VersionList from "~/components/project/VersionList.vue";

// pages
import dynamicCSS from "~/assets/talks/dynamic-css/index.slides";
import agileSystems from "~/assets/talks/agile-systems/index.slides";
import noGrids from "~/assets/talks/no-grid-system/index.slides";
import userUnfriendly from "~/assets/talks/user-unfriendly/index.slides";

export default {
  components: {
    PageTemplate,
    VersionList
  },
  data() {
    const talks = {
      "user-unfriendly": userUnfriendly,
      "no-grid-system": noGrids,
      "dynamic-css": dynamicCSS,
      "agile-systems": agileSystems
    };

    return {
      talks: this.talkData(talks)
    };
  },
  methods: {
    talkData(talks) {
      const data = {};

      Object.keys(talks).forEach(path => {
        const talk = matter(talks[path], {
          excerpt_separator: "<!-- more -->"
        });

        data[path] = talk;
      });

      return data;
    }
  }
};
</script>

<style lang="scss">
.talk-list {
  display: grid;
  grid-gap: size('gutter') size('double-gutter');
  grid-template-columns: repeat(auto-fit, minmax(size('half-page'), size('page')));
  justify-content: space-between;
}
</style>
