<template>
  <section :data-flow="flow">
    <h3>
      Flow: <b>{{ flow }}</b>
      <button-style
        id="flow"
        content='toggle'
        @click="toggleFlow()" />
    </h3>

    <div class="content">
      <div class="resize">
        Resize Me!
      </div>

      <div class="next">Next In Flow</div>
      <div class="last">Last In Flow</div>
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
        flow: 'inline (float)'
      }
    },
    methods: {
      toggleFlow() {
        this.flow = (this.flow === 'block') ? 'inline (float)' : 'block';
      }
    },
  }
</script>

<style lang="scss">
@import '~/assets/scss/_vuefinder.scss';

:root {
  padding: size('gutter');
}

h3 {
  padding: size('half-shim');
}

b {
  color: color('accent');
}

[data-btn-style] {
  float: right;
}

.content {
  @include clearfix;

  div {
    border: 1px solid;
    margin: size('half-shim');
    min-height: size('rhythm', ('times': 1.5));
    min-width: 20%;
    padding: size('half-shim') size('shim');

    [data-flow~='inline'] & {
      float: left;
    }
  }
}

.resize {
  overflow: auto;
  resize: both;
}
</style>
