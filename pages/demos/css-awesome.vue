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
      return {
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
