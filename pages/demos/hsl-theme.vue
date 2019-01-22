<template>
  <hsl-theme class="hsl-theme"/>
</template>

<script>
  import hslTheme from '~/components/demos/hsl-theme.vue';

  export default {
    components: {
      hslTheme,
    },
    head() {
      const title = 'CSS Theme Demo';

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

.hsl-theme {
  min-height: 100vh;
}
</style>
