<template>
  <css-awesome />
</template>

<script>
  import cssAwesome from '~/components/demos/css-awesome.vue';

  export default {
    components: {
      cssAwesome,
    },
    head () {
      const title = 'CSS is Awesome Demo';

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
