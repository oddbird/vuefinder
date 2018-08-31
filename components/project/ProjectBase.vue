<template>
  <main :data-editing="edit">
    <project-meta
      :meta="page.meta"
      :views="page.meta.views"
      :view="page.meta.view"
      :edit="edit"
      :count="page.slides.length"
      @toggleView="toggleView($event)"
      @toggleEdit="toggleEdit()"
      @shuffle="shuffle()" />

    <textarea v-if="edit"
      v-model="src" name="md-src" id="md-src"
      :data-edit="edit ? 'half' : false"
      @change="updatePage" />

    <project-slides
      :meta="page.meta"
      :slides="page.slides"
      :view="page.meta.view"
      :data-edit="edit ? 'half' : false"
      @open="toggleView('slides')"
      @close="close()" />
  </main>
</template>

<script>
  import matter from 'gray-matter';
  import shuffle from 'lodash/shuffle';
  import ProjectMeta from '~/components/project/ProjectMeta.vue';
  import ProjectSlides from '~/components/project/ProjectSlides.vue';

  export default {
    components: {
      ProjectMeta,
      ProjectSlides,
    },
    props: {
      src: {
        type: String,
        required: true,
      },
      demos: {
        type: Object,
        default: function () { return {} },
      },
    },
    data() {
      return {
        page: this.parse(this.src),
        edit: false,
      };
    },
    head() {
      const page = this.page.meta;
      const meta = [
        {
          hid: 'og_title', property: 'og:title',
          content: `${page.title}: ${page.subtitle}`,
        },
        {
          hid: 'og_url', property: 'og:url',
          content: `http://${this.projectUrl()}`,
        },
        {
          hid: 'og_type', property: 'og:type',
          content: 'article',
        },
        {
          hid: 'description', name: 'description',
          content: this.page.excerpt || this.page.content,
        },
        {
          property: 'article:published_time',
          content: `${page.date}T00:00:00`,
        },
      ];

      if (page.image) {
        meta.push(
          {
            hid: 'og_image', property: 'og:image',
            content: page.image,
          },
          {
            hid: 'twitter_card', property: 'twitter:card',
            content: 'summary_large_image',
          },
        );
      }

      if (page.author.facebook) {
        meta.push({
          property: 'article:author',
          content: `https://www.facebook.com/${page.author.facebook}`,
        });
      }

      if (page.author.twitter) {
        meta.push({
          property: 'twitter:creator',
          content: `@${page.author.twitter}`,
        });
      }

      if (page.tags) {
        page.tags.forEach(tag => {
          meta.push({
            property: 'article:tag',
            content: tag,
          });
        });
      }

      return {
        title: `${page.title} | OddTalks`,
        meta: meta
      }
    },
    methods: {
      projectUrl() {
        return `${process.env.domain}${this.$route.fullPath}`;
      },
      // Actions
      updatePage() {
        this.page = this.parse(this.src);
      },
      toggleEdit() {
        this.edit = !this.edit;
      },
      shuffle() {
        this.page.slides = shuffle(this.page.slides);
      },
      toggleView(newView) {
        if (this.page.meta.views.includes(newView) && (this.page.meta.view !== newView)) {
          this.page.meta.lastView = this.page.meta.view;
          this.page.meta.view = newView;
        }
      },
      close() {
        let goTo = this.page.meta.lastView;

        if (goTo === this.page.meta.view) {
          for (let i = 0; i < this.page.meta.views.length; i++) {
            const maybe = this.page.meta.views[i];
            goTo = (maybe === this.page.meta.view)
              ? goTo
              : maybe;
          }
        }

        this.toggleView(goTo);
      },

      // parser
      parse(src) {
        const data = {
          slides: [],
        };

        // parse
        src.split("\n<!-- slide -->\n").forEach(function (partRaw, index) {
          partRaw = partRaw.trimLeft();

          const part = matter(partRaw, { excerpt_separator: "<!-- more -->" });
          part.content = part.content.trimLeft();
          part.excerpt = part.excerpt.trimLeft();

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
        data.meta.lastView = data.meta.view;
        data.meta.type = data.meta.type || 'talks';
        data.meta.demos = this.demos;
        data.meta.listen = true;
        data.meta.projectUrl = this.projectUrl();

        const author = data.meta.author || 0;
        data.meta.author = process.env.authors[author];

        if (data.meta.shuffle_start) {
          data.slides = shuffle(data.slides);
        }

        return data;
      },
    },
  }
</script>

<style lang="scss">
@import '~/assets/scss/_vuefinder.scss';

[data-editing] {
  display: grid;
  grid-template-columns: minmax(0, size('small-page')) minmax(50%, 1fr);
  grid-template-rows: auto minmax(0, 1fr);
  height: 100vh;
  overflow: hidden;

}

[data-edit='full'] {
  border-bottom: pattern('border');
  grid-column: 1 / -1;
}

[data-edit='half'] {
  overflow: auto;
}

[name='md-src'] {
  @include font-family('code');
  font-size: size('xxsmall');
  padding: size('shim');
}
</style>
