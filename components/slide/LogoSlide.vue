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
  display: flex;
  flex-flow: row wrap;
  gap: size('double-gutter');
  justify-content: space-evenly;
  margin: 0 auto;
  max-height: 100vh;
  padding: size('gutter');
}

img {
  flex: 1;
  min-width: 200px;
}

</style>
