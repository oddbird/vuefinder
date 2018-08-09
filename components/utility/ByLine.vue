<template>
  <p :data-byline="id">
    <span v-for="(item, index) in author"
      :key="index">
      <template v-if="index > 0">|</template>
      <link-if
        :url="item.url"
        :data-by="item.type || true" >
        {{ item.name }}
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
      author: {
        type: Array,
        required: true
      },
      id: {
        type: String,
        default: 'default'
      },
    },
  }
</script>
