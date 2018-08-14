<template>
  <iframe :src="getSrc" frameborder="0" />
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
        let baseURL = process.env.baseURL.slice(0, -1);
        return `${baseURL}${this.$route.fullPath}/${this.slide.data.demo}`;
      }
    },
  }
</script>
