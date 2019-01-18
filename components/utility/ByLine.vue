<template>
  <p :data-byline="id">
    <span v-for="(author, index) in authors"
      class="h-card"
      :key="index" >
      <i>{{ author.role || 'by' }}</i>
      <link-if :url="author.url">
        {{ author.name }}
      </link-if>
    </span>
  </p>
</template>

<script>
  import LinkIf from '~/components/utility/LinkIf.vue';

  export default {
    components: {
      LinkIf,
    },
    props: {
      authors: {
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
