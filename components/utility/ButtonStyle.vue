<template>
  <button :data-btn-style="type"
    :disabled="disabled"
    :data-active='active'
    @click="callback($event)" >
    <slot>{{ content }}</slot>
  </button>
</template>

<script>
  export default {
    props: {
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
@import '~assets/scss/config/manifest';

[data-btn-style] {
  background: color('callout');
  border: pattern('border-action');
  flex: 1 0 auto;
  font-size: size('small');
  padding: 0 size('shim');
  transition: all 200ms ease;

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
</style>
