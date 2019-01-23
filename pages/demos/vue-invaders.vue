<template>
  <vue-invaders class="vue-invaders"/>
</template>

<script>
  import vueInvaders from '~/components/demos/vue-invaders.vue';

  export default {
    components: {
      vueInvaders,
    },
    head() {
      const title = 'Vue Invaders Demo';

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

.vue-invaders {
  min-height: 100vh;
}
</style>
