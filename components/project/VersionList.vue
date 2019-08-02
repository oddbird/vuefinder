<template>
  <ul class="version-list">
    <li v-for="version in publicVersions"
      :key="version.slug">

      <nuxt-link
        v-if="version.slug && isLive(version)"
        :to="fullPath(version.slug)"
        v-html="$md.renderInline(version.title)"
      />
      <a
        v-else-if="version.url && isLive(version)"
        :href="version.url"
        v-html="`» ${$md.renderInline(version.title)}`"
      />
      <i
        v-else
        v-html="$md.renderInline(version.title)"
      />

      <span v-if="version.date">
        — {{ displayDate(version.date) }}
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
    computed: {
      publicVersions() {
        return this.versions.filter(version => this.isPublic(version));
      }
    },
    methods: {
      fullPath(slug) {
        return slug
          ? path.join(this.path, slug)
          : null;
      },
      displayDate(date) {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ];
        const mos = months.map(m => m.slice(0, 3));

        return `${mos[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      },
      isPublic(version) {
        if (version.public) {
          return version.public;
        }

        return true;
      },
      isLive(version) {
        if (version.date) {
          return version.date <= new Date();
        }

        return true;
      },
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
