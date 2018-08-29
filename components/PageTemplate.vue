<template>
  <main data-layout="page-template">
    <template-header logoHeight="10em"
      :pullContent="false" />

    <div class="page-content">
      <h1 class="page-title"
        v-html="$md.renderInline(pageTitle)" />
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

  h2 {
    font-size: size('medium');
    font-weight: normal;

    a {
      font-weight: bold;
    }
  }

  p {
    margin-bottom: size('newline');
  }
}

.page-title {
  font-size: size('large');
  font-weight: normal;
  margin-bottom: size('newline');

  strong {
    color: color('accent');
  }
}
</style>
