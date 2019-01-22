<template>
  <css-chart />
</template>

<script>
  import cssChart from '~/components/demos/css-chart.vue';

  export default {
    components: {
      cssChart,
    },
    head() {
      const title = 'CSS Chart Demo';

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

.css-chart {
  min-height: 100vh;
}
</style>
