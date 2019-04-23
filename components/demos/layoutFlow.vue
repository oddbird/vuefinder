<template>
  <section :style="{'--flow': flow}">
    <header>
      <label for="flow-input">Flow:</label>
      <input id="flow-input" type="text" v-model="flow">
    </header>

    <div class="content">
      <div
        data-flow
        contenteditable
      >
        Change Me!
      </div>

      <div data-flow>
        Next In Flow
      </div>
      <div data-flow>
        Last In Flow
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        flow: 'inline',
        resize: false,
      }
    },
  }
</script>

<style lang="scss" scoped>
[data-flow] {
  border: 1px solid;
  display: var(--flow, initial);
  margin: size('half-shim');
  padding: size('half-shim') size('shim');
}

.content {
  border: pattern('border');
  margin: 1em;
}

h3 {
  padding: size('half-shim');
}

b {
  color: color('accent');
}

header {
  border-bottom: pattern('border');
  padding: size('half-shim');
}

input {
  border: pattern('border');
  font-size: size('smaller');
}
</style>
