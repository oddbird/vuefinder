<template>
  <project-base :src="src"
    :demos="demos" />
</template>

<script>
  // The primary stuff
  import ProjectBase from '~/components/project/ProjectBase';
  import fileSrc from '~/assets/talks/advanced-css/systems.slides';

  // Inline-Demo Components as needed
  import codeConcerns from '~/components/demos/codeConcerns';
  import sassSocial from '~/components/demos/sassSocial';

  export default {
    components: {
      ProjectBase,
    },
    data() {
      return {
        src: fileSrc,
        demos: {
          sassSocial,
          codeConcerns,
        }
      }
    },
  }
</script>

