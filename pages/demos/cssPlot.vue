<template>
  <css-plot />
</template>

<script>
  import cssPlot from '~/components/demos/cssPlot.vue';
  import path from 'path';

  export default {
    components: {
      cssPlot,
    },
    head() {
      const title = 'CSS Plot Graph Demo';
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

[data-root='css-plot'] {
  --grow: 1vmin;
  min-height: 100vh;
}
</style>
