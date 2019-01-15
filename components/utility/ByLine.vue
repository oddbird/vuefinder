<template>
  <p :data-byline="id">
    <link-if :url="author.url">
      {{ author.name }}</link-if>
    <template v-if="author.twitter">
      |
      <link-if :url="`http://twitter.com/${author.twitter}`">
        @{{ author.twitter }}</link-if>
    </template>
  </p>
</template>

<script>
  import LinkIf from '~/components/utility/LinkIf.vue';

  export default {
    components: {
      LinkIf,
    },
    props: {
      author: {
        type: Object,
        required: true
      },
      id: {
        type: String,
        default: 'default'
      },
    },
  }
</script>
