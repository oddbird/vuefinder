<template>
  <css-linegraph />
</template>

<script>
  import cssLinegraph from '~/components/demos/css-linegraph.vue';

  export default {
    components: {
      cssLinegraph,
    }
  }
</script>

<style lang="scss">
@import '~/assets/scss/base/_manifest.scss';

[data-root='css-linegraph'] {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-height: 100vh;
}
</style>
