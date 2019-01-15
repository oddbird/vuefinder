<template>
  <page-template>
    <article v-for="(project, path) in projects"
      :key="path">
      <div v-html="$md.render(project.excerpt)" />
      <version-list :path="false"
        :versions="project.data.versions" />
    </article>
  </page-template>
</template>

<script>
  import matter from 'gray-matter';
  import PageTemplate from '~/components/PageTemplate.vue';
  import VersionList from '~/components/project/VersionList.vue';

  // pages
  import sidesaddle from '~/assets/slides/sidesaddle/index.slides';
  // import tenmyths from '~/assets/slides/10myths/index.slides';

  export default {
    components: {
      PageTemplate,
      VersionList,
    },
    data() {
      const projects = {
        sidesaddle: sidesaddle,
        // '10myths': tenmyths,
      };

      return {
        projects: this.get(projects),
      };
    },
    methods: {
      get(projects) {
        const data = {};

        for (const path in projects) {
          if (projects.hasOwnProperty(path)) {
            const project = matter(projects[path], {
              excerpt_separator: "<!-- more -->"
            });

            data[path] = project;
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
