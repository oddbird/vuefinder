<template>
  <p :data-byline="id">
    <link-if :url="author.url">
      {{ author.name }}</link-if>
    <template v-if="author.twitter">
      |
      <link-if :url="`https://twitter.com/${author.twitter}`">
        @{{ author.twitter }}</link-if>
    </template>
    |
    <link-if url="https://twitter.com/oddbird">
      @oddbird</link-if>
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
