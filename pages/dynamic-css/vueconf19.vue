<template>
  <project-base :src="src"
    :demos="demos" />
</template>

<script>
  // The primary stuff
  import ProjectBase from '~/components/project/ProjectBase';
  import fileSrc from '~/assets/talks/dynamic-css/vueconf19.slides';

  // Inline-Demo Components as needed
  import cssAwesome from '~/components/demos/cssAwesome';
  import cssChart from '~/components/demos/cssChart';
  import layoutFlow from '~/components/demos/layoutFlow';
  import layoutFlex from '~/components/demos/layoutFlex';
  import layoutGrid from '~/components/demos/layoutGrid';
  import cssLinegraph from '~/components/demos/cssLinegraph';
  import cssPlot from '~/components/demos/cssPlot';
  import hslTheme from '~/components/demos/hslTheme';

  export default {
    components: {
      ProjectBase,
    },
    data() {
      return {
        src: fileSrc,
        demos: {
          cssAwesome,
          cssChart,
          layoutFlow,
          layoutFlex,
          layoutGrid,
          cssLinegraph,
          cssPlot,
          hslTheme,
        }
      }
    },
  }
</script>

<style lang="scss">
@import '~/assets/scss/_vuefinder.scss';
</style>
