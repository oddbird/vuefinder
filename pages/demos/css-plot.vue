<template>
  <css-plot />
</template>

<script>
  import cssPlot from '~/components/demos/css-plot.vue';

  export default {
    components: {
      cssPlot,
    },
  }
</script>

<style lang="scss">
@import '~/assets/scss/base/_manifest.scss';

[data-root='css-plot'] {
  --grow: 1vmin;
  min-height: 100vh;
}
</style>
