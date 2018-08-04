<template>
  <div data-slide-layout="title">Title Slide</div>
</template>

<script>
  import ProjectTitle from '~/components/project/ProjectTitle.vue';
  import ByLine from '~/components/utility/ByLine.vue';
  import ByLogo from '~/components/utility/ByLogo.vue';

  export default {
    components: {
      ProjectTitle,
      ByLine,
      ByLogo,
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
    methods: {
      getDomain() {
        return process.env.domain ? process.env.domain : '';
      },
    },
  }
</script>

<style lang="scss">


[data-slide-layout='project-title'] {
  text-align: center;
}

.title-logo {
  max-height: size('gutter', ('times': 8));
  max-width: 60%;
}
</style>
