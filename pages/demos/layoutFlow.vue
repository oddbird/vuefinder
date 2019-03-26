<template>
  <layout-flow />
</template>

<script>
  import layoutFlow from '~/components/demos/layoutFlow.vue';
  import path from 'path';

  export default {
    components: {
      layoutFlow,
    },
    head() {
      const title = 'Layout Flow Demo';
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

[data-demo='layoutFlow'] {
  min-height: 100vh;
}
</style>
