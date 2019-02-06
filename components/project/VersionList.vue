<template>
  <ul class="version-list">
    <li v-for="version in versions"
      :key="version.slug">
      <nuxt-link :to="fullPath(version.slug)">{{ version.title }}</nuxt-link>
      <span>
        — {{ version.date }}
      </span>
    </li>
  </ul>
</template>

<script>
  import path from 'path';

  export default {
    props: {
      versions: {
        type: Array,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    },
    methods: {
      fullPath(slug) {
        return path.join(this.path, slug);
      }
    },
  }
</script>

<style lang="scss" scoped>
.version-list {
  margin: size('newline') auto;
}

span {
  color: color('text-light');
}
</style>
