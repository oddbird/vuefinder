<template>
  <p :data-byline="authorID" >
    <link-if v-if="author.name"
      data-by="author"
      :url="author.url">
      {{ author.name }}
    </link-if>
    <template v-if="author.name && author.org">
      |
    </template>
    <link-if v-if="author.org"
      data-by="author.org"
      :url="author.org_url">
      {{ author.org }}
    </link-if>
  </p>
</template>

<script>
  import LinkIf from '~/components/utility/LinkIf.vue';

  export default {
    components: {
      LinkIf,
    },
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
