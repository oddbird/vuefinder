<template>
  <ul class="version-list">
    <li v-for="version in versions"
      :key="version.slug">
      {{ version.date }} —
      <nuxt-link :to="fullPath(version.slug)">
        {{ version.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      versions: {
        type: Array,
        required: true,
      },
      path: {
        type: [String, Boolean],
        required: true,
      },
    },
    methods: {
      fullPath(slug) {
        const path = this.path ? `${this.path}/` : '';
        return `${path}${slug}/`
      }
    },
  }
</script>
