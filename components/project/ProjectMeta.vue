<template>
  <div data-banner="project" >
    <nuxt-link to="/"
      rel="home">
      🏠
    </nuxt-link>

    <header data-header="project">
      <project-title :title="meta.title"
        :subtitle="meta.subtitle"
        data-title="project" />

      <by-line id="banner"
        :authors="meta.authors" />
    </header>

    <nav data-nav="slides">
      <span v-if="count"
        class="slide-count">
        view <b>{{ count }}</b> cards as…
      </span>
      <button-style v-if="meta.shuffle"
        id="shuffle"
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
      count: {
        type: [Number, Boolean],
        default: false,
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
  grid-column-gap: size('shim');
  grid-row-gap: size('half-shim');
  grid-template-columns: minmax(0, auto) minmax(0, 1fr) minmax(0, auto);
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

[data-header='project'],
[data-nav='slides'] {
  grid-column: 2 / span 2;

  @include above('wide') {
    grid-column: initial;
  }
}

[data-title='project'] {
  display: inline-block;
}

[data-byline='banner'] {
  font-size: size('xsmall');
}

[data-nav='slides'] {
  align-items: flex-start;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  font-size: size('xsmall');
}

.slide-count {
  flex: 1 1 100%;
  text-align: right;

  b {
    color: color('accent');
  }
}

[data-btn-id='shuffle'] {
  margin-left: size('half-shim');
}
</style>
