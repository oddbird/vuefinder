<template>
  <project-index :src="src" />
</template>

<script>
  // The primary stuff
  import ProjectIndex from '~/components/project/ProjectIndex';
  import fileSrc from '~/assets/talks/advanced-css/index.slides';

  export default {
    components: {
      ProjectIndex,
    },
    data() {
      return {
        src: fileSrc,
      }
    },
  }
</script>

