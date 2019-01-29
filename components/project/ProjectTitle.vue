<template>
  <span class="project-title">
    <span
      class="title"
      v-html="$md.renderInline(this.title)" />
    <span
      v-if="subtitle"
      class="subtitle"
      v-html="$md.renderInline(this.subtitle)" />
  </span>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: [String, Boolean],
        default: false
      },
    },
  }
</script>

<style lang="scss">
.title {
  color: color('accent');
  display: inline-block;
}

.subtitle {
  display: inline-block;
  font-weight: normal;
}
</style>
