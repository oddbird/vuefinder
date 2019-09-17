<template>
  <figure :data-resize='slide.data.resize' >
    <iframe data-embed
      :src="slide.data.embed"
    />
  </figure>
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
[data-slide-layout='embed'] {
  align-items: stretch;
  align-self: stretch;
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  justify-items: stretch;
  text-align: left;
}

[data-resize] {
  overflow: hidden;
  resize: both;
}
</style>
