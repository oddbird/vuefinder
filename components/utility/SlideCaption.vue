<template>
  <div v-if="tags"
    data-caption="tags" >
    <span v-for="(tag, index) in tags"
      :key="index">
      #{{ tag }}
    </span>
  </div>
  <div v-else-if="caption"
    data-caption="text"
    v-html='$md.render(caption)' />
</template>

<script>
  export default {
    props: {
      caption: {
        type: [String, Boolean],
        default: false
      },
      tags: {
        type: [Array, Boolean],
        default: false
      },
    },
  }
</script>

<style lang="scss">
[data-caption] {
  grid-area: caption;
  padding: size('shim') size('gutter');
  text-align: left;
}

[data-caption='tags'] {
  color: color('text-light');
  text-align: right;
}

</style>
