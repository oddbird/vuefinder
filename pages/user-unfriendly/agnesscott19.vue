<template>
  <project-base :src="src" :demos="demos"/>
</template>

<script>
// The primary stuff
import ProjectBase from "~/components/project/ProjectBase";
import fileSrc from "~/assets/talks/user-unfriendly/agnesscott19.slides";

// Inline-Demo Components as needed
// import cssAwesome from '~/components/demos/cssAwesome';

export default {
  components: {
    ProjectBase
  },
  data() {
    return {
      src: fileSrc,
      demos: {
        //   cssAwesome,
      }
    };
  }
};
</script>
