<template>
  <project-base :src="src"
    :demos="demos" />
</template>

<script>
  // The primary stuff
  import ProjectBase from '~/components/project/ProjectBase';
  import fileSrc from '~/assets/talks/advanced-css/dynamic.slides';

  // Inline-Demo Components as needed
  import cssChart from '~/components/demos/cssChart';
  import cssLinegraph from '~/components/demos/cssLinegraph';
  import cssPlot from '~/components/demos/cssPlot';
  import cssSprites from '~/components/demos/cssSprites';

  export default {
    components: {
      ProjectBase,
    },
    data() {
      return {
        src: fileSrc,
        demos: {
          cssChart,
          cssLinegraph,
          cssPlot,
          cssSprites,
        }
      }
    },
  }
</script>

