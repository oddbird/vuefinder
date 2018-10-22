<template>
  <project-base :src="src"
    :demos="demos" />
</template>

<script>
  // The primary stuff
  import ProjectBase from '~/components/project/ProjectBase';
  import fileSrc from '~/assets/talks/agile-systems/agiledenver18.slides';

  // Inline-Demo Components as needed
  // import cssAwesome from '~/components/demos/css-awesome';
  // import cssChart from '~/components/demos/css-chart';
  // import cssFlow from '~/components/demos/css-flow';
  // import cssLinegraph from '~/components/demos/css-linegraph';
  // import cssPlot from '~/components/demos/css-plot';
  // import hslTheme from '~/components/demos/hsl-theme';

  export default {
    components: {
      ProjectBase,
    },
    data() {
      return {
        src: fileSrc,
        demos: {
        //   cssAwesome,
        //   cssChart,
        //   cssFlow,
        //   cssLinegraph,
        //   cssPlot,
        //   hslTheme,
        }
      }
    },
  }
</script>

<style lang="scss">
@import '~/assets/scss/_vuefinder.scss';
</style>
