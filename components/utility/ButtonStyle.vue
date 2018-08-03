<template>
  <button :data-btn-id="id"
    :data-btn-style="type"
    :disabled="disabled"
    :data-active='active'
    @click="callback($event)" >
    <slot>{{ content }}</slot>
  </button>
</template>

<script>
  export default {
    props: {
      id: {
        type: [String, Boolean],
        default: false
      },
      content: {
        type: [String, Boolean],
        default: false
      },
      type: {
        type: String,
        default: 'default'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      active: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      callback(e) {
        this.$emit('click', e);
      },
    },
  }
</script>

<style lang="scss">


[data-btn-style~='default'] {
  @include transition('btn');
  background: color('callout');
  border: pattern('border-action');
  flex: 1 0 auto;
  font-size: size('small');
  padding: 0 size('shim');

  #{$focus} {
    @include contrasted('action');
    --text-shadow: #{color('text')};
  }

  &[data-active] {
    @include contrasted('accent');
    --text-shadow: #{color('text')};
  }
}

[data-btn-style='default'] {
  border-radius: size('corner');
}

[data-btn-style='emoji'] {
  filter: grayscale(100%);
  font-size: size('xsmall');
  padding: 0 size('half-shim');

  #{$focus} {
    filter: grayscale(0);
  }
}
</style>
