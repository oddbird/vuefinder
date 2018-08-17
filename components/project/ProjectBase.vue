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
    },
    data() {
      return {
        page: this.parse(this.src),
        edit: false,
      };
    },
    head () {
      return {
        title: `${this.page.meta.title} | OddTalks`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.page.excerpt,
          }
        ]
      }
    },
    methods: {
      projectUrl() {
        return `${process.env.domain}${this.$route.fullPath}`;
      },

      // Reactive Data
      showEditToggle() {
        return process.env.DEPLOY_ENV ? false : true;
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
        data.meta.listen = true;
        data.meta.projectUrl = this.projectUrl();

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
