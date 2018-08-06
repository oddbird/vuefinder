<template>
  <main :data-editing="edit">
    <project-meta
      :meta="page.meta"
      :views="page.meta.views"
      :view="page.meta.view"
      :edit="edit"
      :editBtn="showEditToggle()"
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
      @close="toggleView(page.meta.lastView)" />
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
      edit: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        page: this.parse(this.src),
      };
    },
    methods: {
      // Reactive Data
      showEditToggle() {
        return process.env.baseURL === '/' ? true : false;
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

      // parser
      parse(src) {
        // fix image urls in production
        const imgBase = `${process.env.baseURL}images/`;
        src = src.replace(/\/images\//g, imgBase);

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
        data.meta.views = data.meta.views || ['list', 'grid', 'slides'];
        data.meta.view = data.meta.view || data.meta.views[0];
        data.meta.lastView = data.meta.view;

        if (data.meta.shuffle_start) {
          data.slides = shuffle(data.slides);
        }

        return data;
      },
    },
  }
</script>

<style lang="scss">
[data-editing] {
  display: grid;
  grid-template-columns: minmax(0, size('small-page')) minmax(50%, 1fr);
  grid-template-rows: auto minmax(0, 1fr);
  height: 100vh;
  overflow: hidden;

  [name='md-src'] {
    font-size: size('xsmall');
    padding: size('shim');
  }

  [data-edit='full'] {
    border-bottom: pattern('border');
    grid-column: 1 / -1;
  }

  [data-edit='half'] {
    overflow: auto;
  }
}
</style>
