<template>
  <section>
    <header>
      <button-style
        id="flow"
        :content='flow'
        @click="toggleFlow" />
      <button-style
        id="wrap"
        :content='wrap'
        @click="toggleWrap" />
    </header>
    <div :style="style">
      <div class="one">one</div>
      <div class="two">two</div>
      <div class="three">three (out of order, with extra lorem ipsum content)</div>
      <div class="four">four</div>
      <div class="five">five</div>
      <div class="six">six</div>
    </div>
  </section>
</template>

<script>
  import ButtonStyle from '~/components/utility/ButtonStyle.vue';

  export default {
    components: {
      ButtonStyle,
    },
    data() {
      return {
        flow: 'row',
        wrap: 'wrap',
      }
    },
    computed: {
      style() {
        return {
          '--flow': this.flow,
          '--wrap': this.wrap,
        }
      }
    },
    methods: {
      toggleFlow() {
        this.flow = (this.flow === 'row') ? 'column-reverse' : 'row';
      },
      toggleWrap() {
        this.wrap = (this.wrap === 'no wrap') ? 'wrap' : 'no wrap';
      }
    },
  }
</script>

<style lang="scss" scoped>
header {
  align-items: center;
  display: flex;
  padding: size('shim') size('gutter') 0;
}

[style] {
  align-items: center;
  display: flex;
  flex-direction: var(--flow);
  flex-wrap: var(--wrap);
  justify-content: center;
  padding: size('shim') size('gutter');
  position: relative;

  @include after('')
}

[class] {
  border: 1px solid;
  padding: 0.5em 1em;
}

.three {
  order: 1;
}

button {
  font-size: 1em;
  margin-left: size('half-shim');
}
</style>
