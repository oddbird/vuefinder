<template>
  <vue-invaders class="vue-invaders"/>
</template>

<script>
  import vueInvaders from '~/components/demos/vueInvaders.vue';
  import path from 'path';

  export default {
    components: {
      vueInvaders,
    },
    head() {
      const title = 'Vue Invaders Demo';
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

.vue-invaders {
  min-height: 100vh;
}
</style>
