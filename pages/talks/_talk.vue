<template>
  <main data-layout="talks">
    <talk-meta :page="meta"
      :main="slides[0]"
      @shuffle="shuffle"
      @toggleView="toggleView"/>

    <transition-group name="slides"
      :data-slide-layout="meta.view">
      <talk-slide v-for="slide in slides"
        :key="slide.id"
        :slide="slide"
        :view="meta.view ? meta.view : 'list'"/>
    </transition-group>
  </main>
</template>

<script>
  import { parseData } from '~/assets/parser';
  import TalkMeta from '~/components/TalkMeta.vue';
  import TalkSlide from '~/components/TalkSlide.vue';

  export default {
    components: {
      TalkMeta,
      TalkSlide,
    },
    async asyncData({ app, params }) {
      const key = 'talks';
      const src = `md/${key}/${params.talk}.md`;
      let data = await app.$axios.$get(src);
      return parseData(data, key, params.talk, src);
    },
    methods: {
      shuffle() {
        this.slides = _.shuffle(this.slides);
      },
      toggleView() {
        this.meta.view = (this.meta.view === 'list') ? 'grid' : 'list';
      }
    },
  }
</script>

<style lang="scss">
img {
  max-width: 100%;
}

pre {
  background: #eee;
  overflow-x: auto;
  padding: 1em;
  position: relative;

  &::after {
    background: linear-gradient(to right, transparent, #eee);
    bottom: 0;
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 1em;
  }
}

[data-slide-layout] {
  display: grid;
  grid-gap: 1em;
  margin: 1em;
}

[data-slide-layout='grid'] {
  grid-template-columns: repeat(auto-fit, minmax(30em, 1fr));
}

.slides-move,
[data-slide] {
  transition: all 1s ease;
}

.two-up {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(30em, 1fr));

  pre {
    margin: 0;
  }
}
</style>

