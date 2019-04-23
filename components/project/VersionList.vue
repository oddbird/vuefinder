<template>
  <ul class="version-list">
    <li v-for="(version, index) in versions"
      :key="index">

      <nuxt-link
        v-if="version.slug"
        :to="fullPath(version.slug)"
        v-html="$md.renderInline(version.title)"
      />
      <a
        v-else-if="version.url"
        :href="version.url"
        v-html="`» ${$md.renderInline(version.title)}`"
      />
      <i
        v-else
        v-html="$md.renderInline(version.title)"
      />

      <span v-if="version.date">
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
        return slug
          ? path.join(this.$route.path, slug)
          : null;
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
