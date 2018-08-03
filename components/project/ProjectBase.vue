<template>
  <main :data-editing="edit">
    <project-meta
      :meta="meta"
      :views="views"
      :view="view"
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
      :meta="meta"
      :slides="page.slides"
      :view="view"
      :data-edit="edit ? 'half' : false"
      @open="toggleView('slides')"
      @close="toggleView(lastView)" />
  </main>
</template>

<script>
  import { parseData } from '~/assets/parser';
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
      meta: {
        type: Object,
        required: true,
      },
      edit: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        views: this.getViews(),
        view: this.getView(),
        lastView: this.defaultView(),
        page: this.getPage(),
      }
    },
    methods: {
      // Reactive Data
      defaultView() {
        return this.getViews()[0];
      },
      getViews() {
        const defaultViews = ['list', 'grid', 'slides'];
        return this.meta.views ? this.meta.views : defaultViews;
      },
      getView() {
        return this.meta.view ? this.meta.view : this.defaultView();
      },
      showEditToggle() {
        return process.env.baseURL === '/' ? true : false;
      },

      // Actions
      updatePage() {
        this.page = this.getPage(this.src);
      },
      toggleEdit() {
        this.edit = !this.edit;
      },
      shuffle() {
        this.page.slides = shuffle(this.page.slides);
      },
      toggleView(newView) {
        if (this.getViews().includes(newView) && (this.view !== newView)) {
          this.lastView = this.view;
          this.view = newView;
        }
      },

      // parser
      getPage() {
        // fix image urls in production
        const imgBase = `${process.env.baseURL}images/`;
        const src = this.src.replace(/\/images\//g, imgBase);

        const data = {
          slides: [],
        };

        src.split("\n<!-- slide -->\n").forEach(function (partRaw, index) {
          partRaw = partRaw.trimLeft();

          const part = matter(partRaw, { excerpt_separator: "<!-- more -->" });
          part.content = part.content.trimLeft();
          part.excerpt = part.excerpt.trimLeft();

          if (index === 0) {
            data.content = part.content;
            data.excerpt = part.excerpt;
          } else {
            part.id = `slide-${index}`;
            data.slides.push(part);
          }
        });

        if (this.meta.shuffle_start) {
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
