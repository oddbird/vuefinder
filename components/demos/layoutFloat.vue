<template>
  <section>
    <div class="layout"
      :data-clear="clear" >
      <div class="float">
        <button-style
          id="clear"
          :content='clear ? "clearfix" : "no fix"'
          @click="toggleClear" />

        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis laudantium ea tenetur quas incidunt. Voluptatibus veritatis, rerum vitae illum, recusandae quis. Recusandae quisquam sunt id, eius debitis quos animi hic.
      </div>
      <div class="next">Next! (not floating)</div>
      <div class="last">Last! (floating)</div>
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
        clear: false
      }
    },
    methods: {
      toggleClear() {
        this.clear = !this.clear;
      }
    },
  }
  </script>

<style lang="scss" scoped>
.layout {
  background: white;
  border: 1px solid;
  margin: 2em;
  padding: 1rem;
}

[data-clear] {
  &::after {
    background: red;
    clear: both;
    content: 'this is my clearfix';
    display: table;
  }
}

.float {
  border: 1px solid red;
  float: left;
  margin-right: 1em;
  resize: both;
  overflow: auto;
  padding: 0.5rem;
  width: 10em;
}

.next,
.last {
  border: 1px solid blue;
  margin-bottom: 1em;
  padding: 0.5rem;
}

.last {
  float: left;
}

button {
  font: inherit;
}
</style>
