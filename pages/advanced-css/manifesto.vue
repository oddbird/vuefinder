<template>
  <project-base :src="src"
    :demos="demos" />
</template>

<script>
  // The primary stuff
  import ProjectBase from '~/components/project/ProjectBase';
  import fileSrc from '~/assets/talks/advanced-css/manifesto.slides';

  // Inline-Demo Components as needed
  import layoutFlow from '~/components/demos/layoutFlow';

  export default {
    components: {
      ProjectBase,
    },
    data() {
      return {
        src: fileSrc,
        demos: {
          layoutFlow,
        }
      }
    },
  }
</script>

