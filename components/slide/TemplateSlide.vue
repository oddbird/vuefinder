<template>
  <template-base
    :slide="slide"
    :meta="meta" />
</template>

<script>
  import TemplateBase from '~/components/slide/TemplateBase.vue';

  export default {
    components: {
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
