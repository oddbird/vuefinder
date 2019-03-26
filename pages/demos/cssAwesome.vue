<template>
  <css-awesome />
</template>

<script>
  import cssAwesome from '~/components/demos/cssAwesome.vue';
  import path from 'path';

  export default {
    components: {
      cssAwesome,
    },
    head () {
      const title = 'CSS is Awesome Demo';
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
        link: [
          {
            rel: 'stylesheet',
            href: 'https://use.typekit.net/klr0cdt.css'
          }
        ]
      }
    },
  }
</script>

<style lang="scss">
@import '~/assets/scss/base/_manifest.scss';

:root {
  font-size: calc(16px + 1.5vw);
}

section {
  min-height: 100vh;
}
</style>
