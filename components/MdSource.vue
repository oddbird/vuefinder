<template>
  <div :data-edit-mode="edit">
    <textarea v-if="edit"
      v-model="src"
      name="md-src"
      id="md-src"
      :data-editing="edit" />

    <main :data-editing="edit">
      <talk-meta :title="title"
        :subtitle="subtitle"
        :meta="meta"
        :views="views()"
        :activeView="view()"
        @toggleView="toggleView($event)"
        @shuffle="shuffle()" />

      <slide-controls v-show="(view() === 'slides')"
        :fallback="fallback()"
        :paused="paused"
        :hasPrev="(prev !== active)"
        :hasNext="(next !== active)"
        @nextSlide="nextSlide()"
        @prevSlide="prevSlide()"
        @togglePaused="togglePaused()"
        @toggleView="toggleView($event)" />

      <transition-group name="slides"
        tag="div"
        :data-slide-layout="view()"
        :data-project-type="type" >
        <talk-slide v-for="(slide, index) in page().slides"
          :isPrev="(prev === index) ? true : false"
          :isActive="(active === index) ? true : false"
          :isNext="(next === index) ? true : false"
          :key="slide.id"
          :slide="slide"
          :view="view()" />
      </transition-group>
    </main>
  </div>
</template>

<script>
  import { parseData } from '~/assets/parser';
  import matter from 'gray-matter';
  import shuffle from 'lodash/shuffle';
  import TalkMeta from '~/components/TalkMeta.vue';
  import TalkSlide from '~/components/TalkSlide.vue';
  import SlideControls from '~/components/SlideControls.vue';

  export default {
    components: {
      TalkMeta,
      TalkSlide,
      SlideControls,
    },
    props: {
      src: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      subtitle: {
        type: [String, Boolean],
        default: false,
      },
      meta: {
        type: Object,
        required: true,
      },
      type: {
        type: String,
        default: 'talks',
      },
      edit: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        prev: 0,
        active: 0,
        next: 1,
        paused: false,
        lastView: false,
      }
    },
    mounted() {
      window.addEventListener('keydown', this.keyMove);
    },
    destroyed() {
      window.removeEventListener('keydown', this.keyMove);
    },
    methods: {
      // Reactive Data
      defaultView() {
        return this.views()[0];
      },
      views() {
        const defaultViews = ['list', 'grid', 'slides'];
        return this.meta.views ? this.meta.views : defaultViews;
      },
      view() {
        return this.meta.view ? this.meta.view : this.defaultView();
      },
      fallback() {
        return this.lastView ? this.lastView : this.defaultView();
      },

      // Actions
      shuffle() {
        this.page().slides = shuffle(this.page().slides);
      },
      toggleView(newView) {
        if (this.views().includes(newView) && (this.view() !== newView)) {
          this.lastView = this.view();
          this.meta.view = newView;
        }
      },
      togglePaused() {
        const isSlides = (this.view() === 'slides');
        this.paused = isSlides ? !this.paused : this.paused;
      },
      changeState(move) {
        const max = (this.page().slides.length - 1);
        let isActive = (this.active + move);
        isActive = (isActive < 0) ? 0 : isActive;
        isActive = (isActive > max) ? max : isActive;

        this.prev = (isActive === 0) ? 0 : (isActive - 1);
        this.active = isActive;
        this.next = (isActive === max) ? max : (isActive + 1);
      },
      nextSlide() {
        this.changeState(1);
      },
      prevSlide() {
        this.changeState(-1);
      },
      keyMove(e) {
        if (this.view() === 'slides') {
          switch (e.code) {
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
              if (!this.paused) {
                this.prevSlide();
              }
              break;
            case 'ArrowRight':
            case 'ArrowDown':
            case 'PageDown':
            case 'Space':
              if (!this.paused) {
                this.nextSlide();
              }
              break;
            case 'Escape':
              if (this.paused) {
                this.togglePaused();
              }
              this.toggleView(this.fallback());
              break;
            case 'Period':
              this.togglePaused();
              break;
            }
        } else {
          switch (e.code) {
            case 'F5':
              this.toggleView('slides');
              e.preventDefault();
              break;
          }
        }
      },

      // parser
      page() {
        const src = this.src;
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

        return data;
      },
    },
  }
</script>
