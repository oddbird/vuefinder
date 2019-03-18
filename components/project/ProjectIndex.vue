<template>
  <page-template :homeLink="true"
    :pageTitle="`**${page.data.title}** ${page.data.subtitle || ''}`"
    :author="author()" >
    <div class="project">
      <div class="project-summary"
        v-html="$md.render(page.content)" />
      <h2>Event Slides:</h2>
      <version-list path="."
        :versions="page.data.versions" />
    </div>
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
        const authors = process.env.authors;
        const author = this.page.data.author;
        return author
          ? authors[author]
          : authors[Object.keys(authors)[0]];
      }
    },
  }
</script>

<style lang="scss" scoped>
.project-summary {
  margin-bottom: size('newline');
}

.project {
  max-width: size('page');
}
</style>
