<template>
  <hsl-theme class="hsl-theme"/>
</template>

<script>
  import hslTheme from '~/components/demos/hsl-theme.vue';

  export default {
    components: {
      hslTheme,
    },
  }
</script>

<style lang="scss">
@import '~/assets/scss/base/_manifest.scss';

.hsl-theme {
  min-height: 100vh;
}
</style>
