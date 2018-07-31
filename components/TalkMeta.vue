<template>
  <div data-banner="talk">
    <header>
      <h1 data-title="page">
        <b v-html="$md.renderInline(title)" />
        <span
          v-if="subtitle"
          v-html="$md.renderInline(subtitle)"/>
      </h1>

      <div v-if="meta.author || meta.org"
        class="byline">
        <link-if v-if="name"
          data-by="author"
          :url="meta.author.url">{{ name }}</link-if>
        <template v-if="meta.author && meta.org">
          |
        </template>
        <link-if v-if="org"
          data-by="org"
          :url="meta.org.url">{{ org }}</link-if>
      </div>
    </header>

    <nav data-nav="talk">
      <button v-if="meta.shuffle"
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
      meta: {
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
      title: {
        type: String,
        required: true,
      },
      subtitle: {
        type: [String, Boolean],
        default: false,
      },
    },
    computed: {
      name() {
        if (this.meta.author) {
          return this.meta.author.name || this.meta.author;
        } else {
          return false;
        }
      },
      org() {
        if (this.meta.org) {
          return this.meta.org.name || this.meta.org;
        } else {
          return false;
        }
      },
    },
  }
</script>

<style lang="scss">

</style>
