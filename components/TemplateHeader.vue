<template>
  <div data-part="template-header"
    :data-pull="pullContent"
    :style="{height: logoHeight}"
    role="presentation">
  </div>
</template>

<script>
  export default {
    props: {
      logoHeight: {
        type: String,
        default: 'calc(10em + 3vw)',
      },
      pullContent: {
        type: Boolean,
        default: true,
      }
    },
  }
</script>

<style lang="scss" scoped>
[data-part='template-header'] {
  background: url('/images/_brand/header.jpg') repeat-x top;
  background-position: top;
  background-size: auto 100%;
  grid-column: 1 / -1;
  mix-blend-mode: multiply;
  padding: size('shim');
  text-align: center;
  width: 100%;
}

[data-pull] {
  margin-bottom: negative('double-gutter');
}
</style>
