<template>
  <project-base :src="src"/>
</template>

<script>
  import ProjectBase from '~/components/project/ProjectBase.vue';
  import fileSrc from '~/assets/md/talks/design-systems.slides';

  export default {
    components: { ProjectBase },
    data() {
      return {
        src: fileSrc,
      }
    },
  }
</script>
