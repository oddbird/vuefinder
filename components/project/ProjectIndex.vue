<template>
  <page-template :homeLink="true"
    :pageTitle="`**${page.data.title}** ${page.data.subtitle || ''}`"
    :author="author()" >
    <div class="project-summary"
      v-html="$md.render(page.content)" />
    <h2>Event Slides:</h2>
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
    methods: {
      author() {
        const author = this.page.data.author || 0;
        return process.env.authors[author];
      }
    },
  }
</script>

<style lang="scss" scoped>
.project-summary {
   margin-bottom: size('newline');
}
</style>
