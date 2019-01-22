<template>
  <css-plot />
</template>

<script>
  import cssPlot from '~/components/demos/css-plot.vue';

  export default {
    components: {
      cssPlot,
    },
    head() {
      const title = 'CSS Plot Graph Demo';

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

[data-root='css-plot'] {
  --grow: 1vmin;
  min-height: 100vh;
}
</style>
