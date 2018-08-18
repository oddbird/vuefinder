<template>
  <div data-caption
    v-html='$md.render(caption)'  />
</template>

<script>
  export default {
    props: {
      caption: {
        type: String,
        default: ''
      },
    },
  }
</script>

<style lang="scss">
[data-caption] {
  background: color('callout');
  border-top: pattern('border');
  grid-area: caption;
  padding: size('half-shim');
  text-align: left;
}
</style>
