<template>
  <article>
    <header v-if="talk.meta.title" v-html="talk.meta.title + talk.meta.subtitle"></header>

    <section v-for="card in talk.page"
      class="card"
      :key="card.id"
      v-html="card.content"></section>
  </article>
</template>

<script>
  export default {
    computed: {
      talk() {
        const talkByPath = this.$store.getters['talks/talkByPath'];
        return talkByPath(this.$route.params.talk);
      },
    },
    async fetch({ store }) {
      if (!store.getters['talks/isFetched']) {
        return store.dispatch('talks/fetchTalks');
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

.two-up {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(30em, 1fr));

  pre {
    margin: 0;
  }
}
</style>
