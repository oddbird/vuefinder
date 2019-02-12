<template>
  <project-base :src="src"
    :demos="demos" />
</template>

<script>
  // The primary stuff
  import ProjectBase from '~/components/project/ProjectBase';
  import fileSrc from '~/assets/talks/no-grid-system/boulderpython19.slides';

  // Inline-Demo Components as needed
  import cssAwesome from '~/components/demos/css-awesome';
  import cssChart from '~/components/demos/css-chart';
  import cssLinegraph from '~/components/demos/css-linegraph';
  import cssPlot from '~/components/demos/css-plot';
  import hslTheme from '~/components/demos/hsl-theme';
  import layoutFlex from '~/components/demos/layout-flex';
  import layoutFloat from '~/components/demos/layout-float';
  import layoutFlow from '~/components/demos/layout-flow';
  import layoutGrid from '~/components/demos/layout-grid';
  import layoutTable from '~/components/demos/layout-tabledisplay';

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
          cssLinegraph,
          cssPlot,
          hslTheme,
          layoutFloat,
          layoutFlow,
          layoutFlex,
          layoutGrid,
          layoutTable,
        }
      }
    },
  }
</script>

<style lang="scss">
@import '~/assets/scss/_vuefinder.scss';
</style>
