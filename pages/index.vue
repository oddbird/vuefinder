<template>
  <main data-layout="home">
    <header>
      <h1 v-html="$md.renderInline(src.meta.title)" />
      <by-line id="home"
        :authors="src.meta.authors" />
    </header>

    <nav v-if="src.meta.versions">
      <template v-for="(version, index) in src.meta.versions">
        {{ index > 0 ? '|' : '' }}
        <nuxt-link v-if="version.slug"
          :key="version.slug"
          :data-nav="version.slug"
          :to="version.slug">
          {{ version.title }}
        </nuxt-link>
        <a v-else-if="version.url"
          :key="version.slug"
          :data-nav="version.slug"
          :href="version.url">
          {{ version.title }}
        </a>
      </template>
    </nav>

    <section data-section="intro"
      v-html="src.content" />

    <section v-for="(slide, index) in src.slides"
      :key="index"
      :data-section="slide.data.section"
      :style="slide.data.style"
      v-html="slide.content" />
  </main>
</template>

<script>
  import matter from 'gray-matter';
  import typogr from 'typogr';
  import ByLine from '~/components/utility/ByLine.vue';
  import sidesaddle from '~/assets/slides/index.slides';

  export default {
    components: {
      ByLine,
    },
    data() {
      return {
        src: this.parse(sidesaddle),
      };
    },
    methods: {
      parse(src) {
        const md = this.$md;
        const data = {
          slides: [],
        };

        // parse
        src.split("\n<!-- slide -->\n").forEach(function (partRaw, index) {
          partRaw = partRaw.trimLeft();

          const part = matter(partRaw, { excerpt_separator: "<!-- more -->" });
          part.content = typogr.typogrify(md.render(part.content.trimLeft()));

          if (index === 0) {
            data.meta = part.data;
            data.content = part.content;
            data.excerpt = part.excerpt;
          } else {
            part.id = `slide-${index}`;
            data.slides.push(part);
          }
        });

        // defaults
        data.meta.views = data.meta.views || ['grid', 'list', 'slides'];
        data.meta.view = data.meta.view || data.meta.views[0];
        data.meta.type = data.meta.type || 'talks';
        data.meta.demos = this.demos;
        data.meta.listen = true;

        return data;
      },
    },
  }
</script>

<style lang="scss">
@import '~/assets/scss/_vuefinder.scss';
[data-layout='home'] {
  max-width: size('page');
  margin: size('gutter') auto;
}

[data-section] {
  margin: size('spacer') 0;
}
</style>
