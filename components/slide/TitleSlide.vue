<template>
  <template-base
    :slide="slide"
    :meta="meta" >
    <div data-part="title-main">
      <h2>
        <project-title
          :title="meta.title"
          :subtitle="meta.subtitle" />
      </h2>
      <p v-if="meta.event || meta.date">
        <strong v-if="meta.event">{{ meta.event }}</strong>
        <span v-if="meta.date"> — {{ meta.date }}</span>
      </p>
    </div>
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
  padding: size('shim');
  text-align: center;
}
</style>
