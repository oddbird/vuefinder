<template>
  <project-base :src="src"
    :demos="demos" />
</template>

<script>
  // The primary stuff
  import ProjectBase from '~/components/project/ProjectBase';
  import fileSrc from '~/assets/talks/dynamic-css/generate19.slides';

  // Inline-Demo Components as needed
  import cssAwesome from '~/components/demos/cssAwesome';
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
          cssAwesome,
          cssLinegraph,
          cssPlot,
          cssSprites,
        }
      }
    },
  }
</script>

