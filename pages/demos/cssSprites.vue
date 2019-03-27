<template>
  <css-sprites />
</template>

<script>
  import cssSprites from '~/components/demos/cssSprites.vue';
  import path from 'path';

  export default {
    components: {
      cssSprites,
    },
    head() {
      const title = 'CSS Sprites Demo';
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

.sprite-demo {
  min-height: 100vh;
}
</style>
