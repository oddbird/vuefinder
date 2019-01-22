<template>
  <css-linegraph />
</template>

<script>
  import cssLinegraph from '~/components/demos/css-linegraph.vue';

  export default {
    components: {
      cssLinegraph,
    },
    head() {
      const title = 'CSS Line Graph Demo';

      let path = `${process.env.httpUrl}${this.$route.path}`;
      path = path.endsWith('/') ? path : path + '/';

      const meta = [
        {
          hid: 'og_title', property: 'og:title',
          content: title,
        },
        {
          hid: 'og_url', property: 'og:url',
          content: path,
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
