<template>
  <page-template :pageTitle="`**${page.data.title}** ${page.data.subtitle}`">
    <div v-html="$md.render(page.content)" />
    <version-list :path="false"
      :versions="page.data.versions" />
  </page-template>
</template>

<script>
  import matter from 'gray-matter';
  import PageTemplate from '~/components/PageTemplate.vue';
  import VersionList from '~/components/project/VersionList.vue';

  export default {
    components: {
      PageTemplate,
      VersionList,
    },
    props: {
      src: {
        type: String,
        required: true,
      },
    },
    computed: {
      page() {
        return matter(this.src, {
          excerpt_separator: "<!-- more -->"
        });
      }
    },
  }
</script>
