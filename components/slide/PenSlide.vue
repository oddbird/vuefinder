<template>
  <div class="pen-wrapper">
    <no-ssr>
      <p
        class="codepen"
        data-height="100%"
        data-theme-id="light"
        :data-editable="pen.edit"
        :data-default-tab="tab"
        :data-user="`${user}`"
        :data-slug-hash="pen.id"
        :data-pen-title="pen.title"
      >
        <span>
          See the Pen
          <a :href="`https://codepen.io/${user}/pen/${pen.id}/`">
            {{ pen.title }}
          </a>
          by {{ author || 'Miriam Suzanne' }}
          (<a :href="`https://codepen.io/${user}/`">@{{ user }}</a>)
          on <a href="https://codepen.io">CodePen</a>.
        </span>
      </p>
      <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
    </no-ssr>
  </div>
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
      pen() {
        return this.slide.data.pen;
      },
      author() {
        const authors = {
          mirisuzanne: 'Miram Suzanne',
          stacy: 'Stacy Kvernmo',
        };
        return this.pen.author || authors[this.user] || 'Miram Suzanne';
      },
      user() {
        return this.pen.user || 'mirisuzanne';
      },
      tab() {
        return this.pen.tab || 'result';
      },
    },
  }
</script>

<style lang="scss">
[data-slide-layout='pen'] {
 display: grid;
 grid-template: 1fr / 1fr;
}

.codepen {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1em 0;
  padding: 1em;
}
</style>
