<template>
  <ol>
    <li
      v-for="item in meta.toc"
      :key="item.slug"
      v-html="$md.renderInline(item.name)"
      :data-active="(slide.data.toc === item.slug)"
      class="toc" />
  </ol>
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
[data-slide-layout='toc'] {
  align-content: safe center;
  display: grid;
  margin: 0 size('double-gutter');
  justify-content: safe center;
}

.toc {
  text-decoration: line-through;

  &[data-active] {
    font-size: size('xlarger');
  }

  &[data-active],
  [data-active] ~ & {
    text-decoration: none;
  }
}
</style>
