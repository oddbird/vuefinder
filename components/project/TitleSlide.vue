<template>
  <slide-base :id="id"
    :view="view"
    :state="state"
    layout="project-title" >

    <by-logo class="title-logo"
      :authorID="id" />

    <div class="title-content">
      <project-title :title="meta.title"
        :subtitle="meta.subtitle"
        :h2="true" />
      <by-line :authorID="id" />

      <nuxt-link :to="$route.path">
        {{ getDomain() + $route.fullPath }}
      </nuxt-link>
    </div>
  </slide-base>
</template>

<script>
  import SlideBase from '~/components/project/SlideBase.vue';
  import ProjectTitle from '~/components/project/ProjectTitle.vue';
  import ByLine from '~/components/utility/ByLine.vue';
  import ByLogo from '~/components/utility/ByLogo.vue';

  export default {
    components: {
      SlideBase,
      ProjectTitle,
      ByLine,
      ByLogo,
    },
    props: {
      id: {
        type: String,
        required: true
      },
      meta: {
        type: Object,
        required: true
      },
      view: {
        type: String,
        required: true,
      },
      state: {
        type: [String, Boolean],
        required: true,
      },
    },
    methods: {
      getDomain() {
        return process.env.domain ? process.env.domain : '';
      },
    },
  }
</script>

<style lang="scss">


[data-slide-layout='project-title'] {
  text-align: center;
}

.title-logo {
  max-height: size('gutter', ('times': 8));
  max-width: 60%;
}
</style>
