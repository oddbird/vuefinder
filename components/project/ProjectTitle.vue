<template>
  <h2 v-if="h2"
    v-html="fullTitle"
    class="project-title" />
  <h1 v-else
    v-html="fullTitle"
    class="project-title" />
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: [String, Boolean],
        default: false
      },
      h2: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      fullTitle() {
        let title = this.$md.renderInline(this.title);
        title = `<span class="title">${title}</span>`;

        if (this.subtitle) {
          const subtitle = this.$md.renderInline(this.subtitle);
          return `${title} <span class="subtitle">${subtitle}</span>`
        } else {
          return title;
        }
      }
    },
  }
</script>

<style lang="scss">
@import '~assets/scss/config/manifest';

.title {
  color: color('accent');
  display: inline-block;
}

.subtitle {
  display: inline-block;
  font-weight: normal;
}
</style>
