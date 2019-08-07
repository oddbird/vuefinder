<template>
  <footer class="odd-footer">
    <p class="odd-pitch">
      <strong>
        © {{ year }}
        <a href="http://oddbird.net">OddBird</a>
      </strong> |
      We provide custom web design and development services --
      from <strong>new products</strong>
      to <strong>refactors</strong>,
      <strong>design systems</strong>,
      and <strong>more</strong> --
      with a commitment to human-centered software
      and scalable, accessible, performant code.
    </p>

    <odd-news />
  </footer>
</template>

<script>
  import OddNews from '~/components/utility/OddNews.vue';

  export default {
    components: {
      OddNews,
    },
    computed: {
      year() {
        return new Date().getUTCFullYear();
      }
    },
  }
</script>

<style lang="scss">
.odd-footer {
  display: grid;
  background: color('callout');
  font-size: size('small');
  grid-gap: size('gutter');
  grid-template-columns: repeat(auto-fit, minmax(min-content, size('page')));
  justify-content: center;
  margin-top: size('gutter');
  padding: size('gutter');
}

.odd-pitch {
  font-size: size('smaller');
}
</style>
