<template>
  <div data-banner="talk">
    <header>
      <h1 data-title="page">
        <b v-html="$md.renderInline(page.title)" />
        <span
          v-if="page.subtitle"
          v-html="$md.renderInline(page.subtitle)"/>
      </h1>

      <div v-if="page.author || page.org"
        class="byline">
        <link-if v-if="name"
          data-by="author"
          :url="page.author.url">{{ name }}</link-if>
        <template v-if="page.author && page.org">
          |
        </template>
        <link-if v-if="org"
          data-by="org"
          :url="page.org.url">{{ org }}</link-if>
      </div>
    </header>

    <nav data-nav="talk">
      <button v-if="page.shuffle"
        data-btn-style
        @click="$emit('shuffle')">
        Shuffle
      </button>

      <div data-btn-group="views">
        <button v-for="view in views"
          :key='view'
          :data-group-btn='view'
          :data-active="(view === activeView)"
          @click="$emit('toggleView', view)">
          {{ view }}
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
  import LinkIf from '~/components/utility/LinkIf.vue';

  export default {
    components: {
      LinkIf,
    },
    props: {
      page: {
        type: Object,
        required: true,
      },
      views: {
        type: Array,
        required: true,
      },
      activeView: {
        type: String,
        required: true,
      },
    },
    computed: {
      name() {
        if (this.page.author) {
          return this.page.author.name || this.page.author;
        } else {
          return false;
        }
      },
      org() {
        if (this.page.org) {
          return this.page.org.name || this.page.org;
        } else {
          return false;
        }
      },
    },
  }
</script>

<style lang="scss">

</style>
