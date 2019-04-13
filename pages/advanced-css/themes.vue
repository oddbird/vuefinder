<template>
  <project-base :src="src"
    :demos="demos" />
</template>

<script>
  // The primary stuff
  import ProjectBase from '~/components/project/ProjectBase';
  import fileSrc from '~/assets/talks/advanced-css/themes.slides';

  // Inline-Demo Components as needed
  import cssTheme from '~/components/demos/cssTheme';
  import hslTheme from '~/components/demos/hslTheme';

  export default {
    components: {
      ProjectBase,
    },
    data() {
      return {
        src: fileSrc,
        demos: {
          cssTheme,
          hslTheme,
        }
      }
    },
  }
</script>

