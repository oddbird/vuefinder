<template>
  <project-base :src="src"
    :demos="demos" />
</template>

<script>
  // The primary stuff
  import ProjectBase from '~/components/project/ProjectBase';
  import fileSrc from '~/assets/talks/no-grid-system/covalence19.slides';

  // Inline-Demo Components as needed
  import cssAwesome from '~/components/demos/cssAwesome';
  import cssChart from '~/components/demos/cssChart';
  import cssLinegraph from '~/components/demos/cssLinegraph';
  import cssPlot from '~/components/demos/cssPlot';
  import hslTheme from '~/components/demos/hslTheme';
  import layoutFlex from '~/components/demos/layoutFlex';
  import layoutFloat from '~/components/demos/layoutFloat';
  import layoutFlow from '~/components/demos/layoutFlow';
  import layoutGrid from '~/components/demos/layoutGrid';
  import layoutTable from '~/components/demos/layoutTabledisplay';

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

