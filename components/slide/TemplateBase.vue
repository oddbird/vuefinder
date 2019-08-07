<template>
  <div data-slide-base="template">
    <template-header />

    <slot>
      <div data-part="template-main"
        v-html="$md.render(slide.content)" />
    </slot>

    <footer data-part="template-footer">
      <a v-if="meta.oddsite"
        :href="`https://${oddUrl}`">
        {{ oddUrl }}
      </a>
      <nuxt-link v-else
        :to="$route.path"
        class="slides-url">
        {{ meta.projectUrl }}
      </nuxt-link>
      <by-line id="slide"
        :author="meta.author" />
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
    computed: {
      oddUrl() {
        if (this.meta.oddsite) {
          return `oddbird.net/${this.meta.oddsite}`;
        }
        return null;
      }
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
