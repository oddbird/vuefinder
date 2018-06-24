<template>
  <main>
    <h1 v-if="title" v-html="title"></h1>
    <h2 v-if="subtitle" v-html="subtitle"></h2>

    <div class="main-body" v-if="content" v-html="content"></div>

    <section v-for="slide in slides"
      :key="slide.id"
      class="slide"
      :style="{ backgroundImage: slide.background }">
      <p v-if="slide.alt" hidden>{{ slide.alt }}</p>
      <div v-if="slide.content" class="slide-body" v-html="slide.content"></div>
    </section>
  </main>
</template>

<script>
  export default {
    asyncData ({ app, params }) {
      const talk = app.context.env.talks[params.talk];
      const md = app.$md;
      const slides = talk.slides.map(slide => {
        slide.content = md.render(slide.content);
        slide.background = `url(${slide.data.background})` || 'none';
        slide.alt = slide.data.alt || null;
        return slide;
      });

      return {
        title: md.renderInline(talk.main.data.title),
        subtitle: md.renderInline(talk.main.data.subtitle),
        content: md.render(talk.main.content),
        excerpt: md.render(talk.main.excerpt),
        slides: slides,
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

.slide {
  background-size: cover;
  border: 1px solid #ccc;
  margin: 1em;
  min-height: 50vh;
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
