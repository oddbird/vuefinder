<template>
  <div data-slide-base="template">
    <template-header />

    <slot>
      <div data-part="template-main"
        v-html="$md.render(slide.content)" />
    </slot>

    <footer data-part="template-footer">
      <nuxt-link :to="$route.path"
        class="slides-url">
        {{ meta.projectUrl }}
      </nuxt-link>
      <by-line v-if="meta.byline"
        id="slide"
        :author="meta.byline" />
    </footer>
  </div>
</template>

<script>
  import ByLine from '~/components/utility/ByLine.vue';
  import TemplateHeader from '~/components/TemplateHeader.vue';

  export default {
    components: {
      ByLine,
      TemplateHeader,
    },
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

<style lang="scss" scoped>
[data-slide-base='template'] {
  align-self: stretch;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto 1fr auto;
}

[data-part='template-main'] {
  align-self: center;
}

[data-part='template-footer'] {
  align-self: end;
  display: flex;
  flex-wrap: wrap;
  font-size: size('smaller');
  font-weight: bold;
  justify-content: space-between;
  padding: size('shim');

  > * {
    flex: 0 0 auto;
  }

  .slides-url {
    margin-right: size('shim');
  }
}
</style>
