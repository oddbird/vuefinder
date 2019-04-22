<template>
  <div data-layout="page-template">
    <template-header logoHeight="10em"
      :pullContent="false" />

    <header class="page-header">
      <nuxt-link v-if="homeLink"
        to="/"
        rel="home">
        🏠
      </nuxt-link>

      <h1 class="page-title"
        v-html="$md.renderInline(pageTitle)" />

      <by-line v-if="author"
        id="page"
        :author="author" />
    </header>

    <main class="page-content">
      <slot>Hello World</slot>
    </main>

    <odd-footer class="page-info" />
  </div>
</template>

<script>
  import TemplateHeader from '~/components/TemplateHeader.vue';
  import ByLine from '~/components/utility/ByLine.vue';
  import OddFooter from '~/components/utility/OddFooter.vue';

  export default {
    components: {
      ByLine,
      OddFooter,
      TemplateHeader,
    },
    props: {
      pageTitle: {
        type: String,
        default: '**OddBird** Talks'
      },
      author: {
        type: [Object, Boolean],
        default: false
      },
      homeLink: {
        type: Boolean,
        default: false
      },
    },
  }
</script>

<style lang="scss" scoped>
[data-layout='page-template'] {
  display: grid;
  grid-gap: size('newline');
  grid-template-columns:
    [full-start] minmax(size('shim'), size('gutter'))
    [content-start] minmax(0, 1fr)
    [content-end] minmax(size('shim'), size('gutter'))
    [full-end];
}

.page-header,
.page-content {
  grid-column: content;
}

.page-info {
  grid-column: full;
}

.page-header {
  align-items: center;
  display: flex;
  flex-wrap: wrap;

  [rel='home'] {
    display: inline-block;
    margin-right: size('shim');

    @include above('page') {
      margin-left: negative(1rem, ('plus': '#shim'));
    }
  }
}

.page-title {
  flex: 1 1 50%;
  font-size: size('large');
  font-weight: normal;

  strong {
    color: color('accent');
  }
}

[data-byline='page'] {
  flex: 0 0 100%;
  font-size: size('smaller');
}

.page-content {
  margin-bottom: size('gutter');

  h2 {
    font-size: size('medium');
    font-weight: normal;

    a {
      font-weight: bold;
    }
  }

  ul,
  ol,
  p {
    margin-bottom: size('newline');
  }
}
</style>
