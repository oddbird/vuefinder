<template>
  <project-base :src="src" />
</template>

<script>
  import ProjectBase from '~/components/project/ProjectBase.vue';
  import fileSrc from '~/assets/talks/dynamic-css.slides';

  export default {
    components: { ProjectBase },
    data() {
      return {
        src: fileSrc,
      }
    },
  }
</script>

<style lang="scss">
@import '~/assets/scss/_vuefinder.scss';
</style>
