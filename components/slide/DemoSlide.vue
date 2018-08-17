<template>
  <figure class="demo-wrap"
      :data-caption="captionPosition()" >
    <div class="demo-container">
      <iframe :data-demo="slide.data.demo"
        :src="getSrc" />
    </div>
    <figcaption v-if="slide.content"
      v-html="$md.render(slide.content)"
      class="demo-caption" />
    <figcaption v-else-if="slide.data.caption"
      class="demo-caption" >
      Demo:
      <a :href="getSrc">
        {{ meta.projectUrl }}/{{ slide.data.demo }}
      </a>
    </figcaption>
  </figure>
</template>

<script>
  export default {
    props: {
      slide: {
        type: Object,
        required: true
      },
      meta: {
        type: Object,
        required: true
      },
    },
    computed: {
      getSrc() {
        let fullPath = this.$route.fullPath;

        if (fullPath.slice(-1) === '/') {
          fullPath = fullPath.slice(0, -1);
        }

        return `${fullPath}/${this.slide.data.demo}`;
      },
    },
    methods: {
      captionPosition() {
        if ((this.slide.content === '') && (!this.slide.data.caption)) {
          return false;
        }

        if (this.slide.data.caption === true) {
          return 'bottom'
        }

        return this.slide.data.caption;
      },
    },
  }
</script>

<style lang="scss">
.demo-wrap {
  background: color('text');
  display: grid;
  grid-template: 'demo' 1fr / minmax(0, 1fr);
}

[data-caption='bottom'],
[data-caption='top'] {
  text-align: center;
}

[data-caption='bottom'] {
  grid-template: 'demo' 1fr
                 'caption' auto / minmax(0, 1fr);
}

[data-caption='top'] {
  grid-template: 'caption' auto
                 'demo' 1fr / minmax(0, 1fr);
}

[data-caption='left'],
[data-caption='right'] {
  text-align: left;
}

[data-caption='left'] {
  grid-template: 'caption demo' 1fr / 1fr minmax(0, 3fr);
}

[data-caption='right'] {
  grid-template: 'demo caption' 1fr / minmax(0, 3fr) 1fr;
}

.demo-container {
  background: color('background');
  display: grid;
  grid-area: demo;
  overflow: hidden;
  resize: both;
}

.demo-caption {
  background: color('callout');
  grid-area: caption;
  padding: size('half-shim');
}
</style>
