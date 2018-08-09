<template>
  <div>
    <img :src="header('src')"
      :alt="header('alt')"
      data-part="title-header" >

    <project-title :title="meta.title"
      :subtitle="meta.subtitle"
      :h2="true"
      data-part="title-main" />

    <footer data-part="title-footer">
      <nuxt-link :to="$route.path">
        {{ projectUrl() }}
      </nuxt-link>
      <by-line v-if="meta.byline"
        id="slide"
        :author="meta.byline" />
    </footer>
  </div>
</template>

<script>
  import ProjectTitle from '~/components/project/ProjectTitle.vue';
  import ByLine from '~/components/utility/ByLine.vue';

  export default {
    components: {
      ProjectTitle,
      ByLine,
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
    data() {
      return {
        defaultHeader: {
          src: '/images/_oddbird/header.jpg',
          alt: 'OddBird'
        },
      }
    },
    methods: {
      getDomain() {
        return process.env.domain ? process.env.domain : '';
      },
      projectUrl() {
        return `${this.getDomain()}${this.$route.fullPath}`;
      },
      header(prop) {
        const defaultVal = this.defaultHeader[prop];
        let userVal;

        if (this.slide.data.header) {
          userVal = this.slide.data.header[prop];
        }

        return userVal || defaultVal;
      },
    },
  }
</script>

<style lang="scss" scoped>
[data-slide-layout='title'] {
  align-self: stretch;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto 1fr auto;
}

[data-part='title-header'] {
  width: 100%;
}

[data-part='title-main'] {
  padding: size('gutter');
  text-align: center;
}

[data-part='title-footer'] {
  display: flex;
  flex-wrap: wrap;
  font-size: size('xsmall');
  font-weight: bold;
  justify-content: space-between;
  padding: size('shim');

  > * {
    flex: 0 0 auto;
  }
}
</style>
