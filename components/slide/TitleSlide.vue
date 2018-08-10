<template>
  <template-base
    :slide="slide"
    :meta="meta" >
    <project-title :title="meta.title"
      :subtitle="meta.subtitle"
      :h2="true"
      data-part="title-main" />
  </template-base>
</template>

<script>
  import ProjectTitle from '~/components/project/ProjectTitle.vue';
  import TemplateBase from '~/components/slide/TemplateBase.vue';

  export default {
    components: {
      ProjectTitle,
      TemplateBase,
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
[data-part='title-main'] {
  align-self: center;
  padding: size('gutter');
  text-align: center;
}
</style>
