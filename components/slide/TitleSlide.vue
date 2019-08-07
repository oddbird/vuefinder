<template>
  <template-base
    :slide="slide"
    :meta="meta" >
    <div data-part="title-main">
      <h2>
        <project-title
          :title="meta.title"
          :subtitle="meta.subtitle" />
      </h2>
      <p v-if="meta.event || meta.date">
        <strong v-if="meta.event">{{ meta.event }}</strong>
        <span v-if="meta.date"> — {{ displayDate(meta.date) }}</span>
      </p>
    </div>
  </template-base>
</template>

<script>
  import ProjectTitle from '~/components/project/ProjectTitle.vue';
  import TemplateBase from '~/components/slide/TemplateBase.vue';

  export default {
    components: {
      ProjectTitle,
      TemplateBase,
    },
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
    methods: {
      displayDate(date) {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ];
        const mos = months.map(m => m.slice(0, 3));

        return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
      },
    },
  }
</script>

<style lang="scss" scoped>
[data-part='title-main'] {
  align-self: center;
  padding: size('shim');
  text-align: center;
}
</style>
