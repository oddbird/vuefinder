<template>
  <css-linegraph />
</template>

<script>
  import cssLinegraph from '~/components/demos/css-linegraph.vue';
  import path from 'path';

  export default {
    components: {
      cssLinegraph,
    },
    head() {
      const title = 'CSS Line Graph Demo';
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

[data-root='css-linegraph'] {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-height: 100vh;
}
</style>
