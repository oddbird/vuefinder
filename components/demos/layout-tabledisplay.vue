<template>
  <section>
    <button-style
      id="table"
      :content='display'
      @click="toggleDisplay()" />
    <div class="layout"
      :data-display="display" >
      <div class="cell">div</div>
      <div class="cell">div (width 40%)</div>
      <div class="cell">div</div>
      <div class="cell">div</div>
      <div class="cell">div</div>
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
        display: 'block'
      }
    },
    methods: {
      toggleDisplay() {
        this.display = (this.display === 'block') ? 'table' : 'block';
      }
    },
  }
  </script>

<style lang="scss" scoped>
section {
  padding: 0.25em;
}

.layout {
  box-sizing: border-box;
  padding: 0.25em;
}

[data-display="table"] {
  background: red;
  border-spacing: 0.5em;
  display: table;
  width: 100%;

  .cell {
    display: table-cell;
  }
}

.cell {
  background: lightblue;
  box-sizing: border-box;
  padding: 0.25em;

  &:nth-child(2) {
    width: 40%;
  }
}

button {
  font: inherit;
  margin: 0.5em;
}
</style>
