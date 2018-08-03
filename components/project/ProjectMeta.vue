<template>
  <div data-banner="project"
    :data-edit="edit ? 'full' : false" >
    <nuxt-link to="/"
      rel="home">
      🏠
    </nuxt-link>

    <header data-header="project">
      <project-title :title="meta.title"
        :subtitle="meta.subtitle"
        data-title="project" />

      <button-style v-if="editBtn"
        content="🖊️"
        type="emoji"
        :data-toggle-edit="edit ? 'on' : 'off'"
        @click="$emit('toggleEdit')" />

      <by-line :authorID="meta.author"
        class="project-byline" />
    </header>

    <nav data-nav="slides">
      <button-style v-if="meta.shuffle"
        content="shuffle"
        @click="emitShuffle" />
      <button-group name="views"
        :options="views"
        :active="view"
        @click="viewSelect" />
    </nav>
  </div>
</template>

<script>
  import ProjectTitle from '~/components/project/ProjectTitle.vue';
  import ButtonGroup from '~/components/utility/ButtonGroup.vue';
  import ButtonStyle from '~/components/utility/ButtonStyle.vue';
  import ByLine from '~/components/utility/ByLine.vue';

  export default {
    components: {
      ProjectTitle,
      ButtonStyle,
      ButtonGroup,
      ByLine,
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
      view: {
        type: String,
        required: true,
      },
      edit: {
        type: Boolean,
        default: false,
      },
      editBtn: {
        type: Boolean,
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
    methods: {
      viewSelect(item) {
        this.$emit('toggleView', item);
      },
      emitShuffle(e) {
        this.$emit('shuffle', e);
      },
    },
  }
</script>

<style lang="scss">


[data-banner="project"] {
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(0, 1fr) minmax(0, auto);
  grid-gap: size('shim');
  padding: size('shim');
}

[rel='home'] {
  #{$link} {
    filter: grayscale(100%);
    font-size: size('small');
  }

  #{$focus} {
    filter: grayscale(0);
  }
}

[data-toggle-edit='off'] {
  @include transition('opacity');
  opacity: 0.5;

  #{$focus} {
    opacity: 1;
  }
}

[data-title="project"] {
  display: inline-block;
}

.project-byline {
  font-size: size('xsmall');
}

[data-nav='slides'] {
  align-items: start;
  display: grid;
  grid-gap: size('half-shim');
  grid-template-columns: auto auto;
}
</style>
