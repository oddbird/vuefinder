<template>
  <img v-if="author.logo"
    :data-logo="authorKey"
    :src="author.logo"
    :alt="author.org_name ? author.org_name : author.name" />
</template>

<script>
  export default {
    props: {
      authorID: {
        type: String,
        required: true
      },
    },
    computed: {
      author() {
        return process.env.authors[this.authorID];
      }
    },
  }
</script>
