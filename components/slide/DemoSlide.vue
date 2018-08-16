<template>
  <div class="demo-container">
    <iframe :data-demo="slide.data.demo"
      :src="getSrc"
      v-html="$md.render(slide.content)" />
  </div>
</template>

<script>
  export default {
    props: {
      slide: {
        type: Object,
        required: true
      },
      meta: {
        type: Object,
        required: true
      },
    },
    computed: {
      getSrc() {
        let fullPath = this.$route.fullPath;

        if (fullPath.slice(-1) === '/') {
          fullPath = fullPath.slice(0, -1);
        }

        return `${fullPath}/${this.slide.data.demo}`;
      }
    },
  }
</script>

<style lang="scss">
.demo-container {
  display: grid;
  overflow: hidden;
  resize: both;
}
</style>
