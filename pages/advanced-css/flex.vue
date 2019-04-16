<template>
  <project-base :src="src"
    :demos="demos" />
</template>

<script>
  // The primary stuff
  import ProjectBase from '~/components/project/ProjectBase';
  import fileSrc from '~/assets/talks/advanced-css/flex.slides';

  // Inline-Demo Components as needed
  import layoutFlow from '~/components/demos/layoutFlow';
  import layoutFloat from '~/components/demos/layoutFloat';

  export default {
    components: {
      ProjectBase,
    },
    data() {
      return {
        src: fileSrc,
        demos: {
          layoutFlow,
          layoutFloat,
        }
      }
    },
  }
</script>

