<template>
  <main data-layout="page-template">
    <template-header logoHeight="10em"
      :pullContent="false" />

    <div class="page-content">
      <h1 v-html="$md.render(pageTitle)" />
      <slot>Hello World</slot>
    </div>
  </main>
</template>

<script>
  import TemplateHeader from '~/components/TemplateHeader.vue';

  export default {
    components: {
      TemplateHeader,
    },
    props: {
      pageTitle: {
        type: String,
        default: '**OddBird** Talks'
      },
    },
  }
</script>

<style lang="scss">
.page-content {
  margin: 0 auto;
  max-width: size('page');
  padding: size('gutter');
}
</style>
