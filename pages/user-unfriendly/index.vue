<template>
  <project-index :src="src"/>
</template>

<script>
// The primary stuff
import ProjectIndex from "~/components/project/ProjectIndex";
import fileSrc from "~/assets/talks/user-unfriendly/index.slides";

export default {
  components: {
    ProjectIndex
  },
  data() {
    return {
      src: fileSrc
    };
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/_vuefinder.scss";
</style>
