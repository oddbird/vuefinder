<template>
  <div data-part="template-header"
    :data-pull="pullContent"
    role="presentation">
    <odd-logo color="var(--background, #fff)"
      :height="logoHeight" />
  </div>
</template>

<script>
  import OddLogo from '~/components/utility/OddLogo.vue';

  export default {
    components: {
      OddLogo,
    },
    props: {
      logoHeight: {
        type: String,
        default: '7em',
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
  background: url('/images/_oddbird/header.jpg') repeat-x top;
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
