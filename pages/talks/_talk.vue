<template>
  <main>
    <h1 v-if="title" v-html="title"></h1>
    <h2 v-if="subtitle" v-html="subtitle"></h2>
    <button v-if="shuffleOpt" @click="shuffle">Shuffle</button>
    <button @click="toggleView">View</button>

    <div class="main-body" v-if="content" v-html="content"></div>

    <transition-group name="slides" class="slides" :data-view="view">
      <section v-for="slide in slides"
        :key="slide.id"
        class="slide"
        :style="{ backgroundImage: slide.background }">
        <p v-if="slide.alt" v-html="slide.alt" hidden></p>
        <div v-if="slide.content" class="slide-body" v-html="slide.content"></div>
      </section>
    </transition-group>
  </main>
</template>

<script>
  import _ from 'lodash';

  export default {
    asyncData ({ app, params }) {
      const talk = app.context.env.talks[params.talk];
      const md = app.$md;
      const slides = talk.slides.map(slide => {
        slide.content = md.render(slide.content);
        slide.background = slide.data.background ? `url(${slide.data.background})` : 'none';
        slide.alt = slide.data.alt ? md.renderInline(slide.data.alt) : '';
        return slide;
      });

      return {
        title: md.renderInline(talk.main.data.title),
        subtitle: md.renderInline(talk.main.data.subtitle),
        content: md.render(talk.main.content),
        excerpt: md.render(talk.main.excerpt),
        slides: talk.main.data.shuffle ? _.shuffle(slides) : slides,
        shuffleOpt: talk.main.data.shuffle,
        view: talk.main.data.view ? talk.main.data.view : 'list',
      }
    },
    methods: {
      shuffle() {
        this.slides = _.shuffle(this.slides);
      },
      toggleView() {
        this.view = (this.view === 'list') ? 'grid' : 'list';
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

.slides {
  display: grid;
  grid-gap: 1em;
  margin: 1em;
}

[data-view='grid'] {
  grid-template-columns: repeat(auto-fit, minmax(30em, 1fr));
}

.slide {
  background-size: cover;
  border: 1px solid #ccc;
  min-height: 50vh;
}

.slides-move {
  transition: all 1s .01ms ease;
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
