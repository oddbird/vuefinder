<template>
  <layout-grid-var data-demo="layoutGridVar" />
</template>

<script>
  import layoutGridVar from '~/components/demos/layoutGridVar.vue';
  import path from 'path';

  export default {
    components: {
      layoutGridVar,
    },
    head() {
      const title = 'Layout Grid (w/ Variables!) Demo';
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

[data-demo='layoutGridVar'] {
  min-height: 100vh;
}
</style>
