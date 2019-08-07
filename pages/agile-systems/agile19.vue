<template>
  <project-base :src="src"
    :demos="demos" />
</template>

<script>
  // The primary stuff
  import ProjectBase from '~/components/project/ProjectBase';
  import fileSrc from '~/assets/talks/agile-systems/agile19.slides';

  // Inline-Demo Components as needed
  import codeConcerns from '~/components/demos/codeConcerns';

  export default {
    components: {
      ProjectBase,
    },
    data() {
      return {
        src: fileSrc,
        demos: {
          codeConcerns,
        }
      }
    },
  }
</script>

