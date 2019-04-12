<template>
  <project-base :src="src"
    :demos="demos" />
</template>

<script>
  // The primary stuff
  import ProjectBase from '~/components/project/ProjectBase';
  import fileSrc from '~/assets/talks/advanced-css/layout.slides';

  // Inline-Demo Components as needed
  import layoutGrid from '~/components/demos/layoutGrid';

  export default {
    components: {
      ProjectBase,
    },
    data() {
      return {
        src: fileSrc,
        demos: {
          layoutGrid,
        }
      }
    },
  }
</script>

