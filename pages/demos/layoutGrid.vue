<template>
  <layout-grid data-demo="layoutGrid" />
</template>

<script>
  import layoutGrid from '~/components/demos/layoutGrid.vue';
  import path from 'path';

  export default {
    components: {
      layoutGrid,
    },
    head() {
      const title = 'Layout Grid Demo';
      let route = this.$route.path.endsWith('/')
        ? this.$route.path
        : this.$route.path + '/';
      route = path.join(process.env.httpUrl, route);

      const meta = [
        {
          hid: 'og_title', property: 'og:title',
          content: title,
        },
        {
          hid: 'og_url', property: 'og:url',
          content: route,
        },
      ];

      return {
        title: `${title} | OddTalks`,
        meta: meta,
      }
    },
  }
</script>

<style lang="scss">
@import '~/assets/scss/base/_manifest.scss';

[data-demo='layoutGrid'] {
  min-height: 100vh;
}
</style>
