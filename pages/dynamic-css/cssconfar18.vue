<template>
  <project-base :src="src"
    :demos="demos" />
</template>

<script>
  // The primary stuff
  import ProjectBase from '~/components/project/ProjectBase';
  import fileSrc from '~/assets/talks/dynamic-css/cssconfar18.slides';

  // Inline-Demo Components as needed
  import cssAwesome from '~/components/demos/css-awesome';
  import cssChart from '~/components/demos/css-chart';
  import cssFlow from '~/components/demos/css-flow';
  import hslTheme from '~/components/demos/hsl-theme';

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
          cssFlow,
          hslTheme,
        }
      }
    },
  }
</script>

<style lang="scss">
@import '~/assets/scss/_vuefinder.scss';
</style>
