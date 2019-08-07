<template>
  <section>
    <img
      v-for="logo in slide.data.logos"
      :key="logo.src"
      :src="`/images/${logo.src}`"
      :alt="logo.alt">
  </section>
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
  }
</script>

<style lang="scss">
[data-slide-layout='logo'] {
  align-items: center;
  display: grid;
  grid: auto-flow / repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: size('double-gutter');
  justify-content: center;
  margin: 0 auto;
  max-height: 100vh;
  padding: size('gutter');

  [data-slide-view='grid'] & {
    grid: auto-flow / repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: size('gutter');
  }
}
</style>
