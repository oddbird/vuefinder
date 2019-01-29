<template>
  <css-chart />
</template>

<script>
  import cssChart from '~/components/demos/css-chart.vue';
  import path from 'path';

  export default {
    components: {
      cssChart,
    },
    head() {
      const title = 'CSS Chart Demo';
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

.css-chart {
  min-height: 100vh;
}
</style>
