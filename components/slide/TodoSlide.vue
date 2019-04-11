<template>
  <div>
    <h2>@@@ ToDo:</h2>
    <h3
      v-if="slide.data.todo"
      v-html="$md.renderInline(slide.data.todo)" />
    <div
      v-else
      v-html="$md.render(slide.content)"></div>
  </div>
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
[data-slide-layout='todo'] {
  --background: #{color('accent')};
  --color: #{color('background')};
  align-content: center;
  display: grid;
  margin: 0 auto;
  max-width: var(--max-width, size('wide'));
  padding: size('gutter');
  text-shadow: 0 1px 0 color('text');
}
</style>
