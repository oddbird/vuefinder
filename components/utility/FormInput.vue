<template>
  <label
    :for="thisId"
    :data-form-fied="field"
  >
    <span
      :data-label="field"
    >
      {{ thisLabel }}
    </span>
    <textarea
      v-if="type === 'textarea'"
      :id="thisId"
      :name="thisName"
      :type="type"
      :value="value"
      :required="required"
      data-input="textarea"
      @keydown.stop=""
    />
    <input
      v-else
      :id="thisId"
      :name="thisName"
      :type="type"
      :value="value"
      :required="required"
      data-input="default"
      @keydown.stop=""
    />
  </label>
</template>

<script>
  export default {
    props: {
      field: {
        type: String,
        required: true,
      },
      label: {
        type: String,
      },
      name: {
        type: String,
      },
      id: {
        type: String,
      },
      value: {
        type: String,
      },
      type: {
        type: String,
        default: 'text',
      },
      required: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      thisLabel() {
        return this.label || this.field;
      },
      thisId() {
        return this.id || this.field;
      },
      thisName() {
        return this.name || this.thisId;
      },
    },
  }
</script>

<style lang="scss">
[data-form-field] {
  display: block;
}

[data-label] {
  display: block;
  font-size: size('xsmaller');
}

[data-input='default'],
[data-input='textarea'] {
  border: pattern('border');
  border-radius: size('corner');
  font-size: size('xsmall');
  padding: size('half-shim');
  transition: border-color 250ms ease;
  width: 100%;

  &:invalid {
    border-color: color('accent');
  }

  &:focus {
    border-color: color('action-hover');
    outline: 0;
  }
}

[data-input='textarea'] {
  min-height: size('double-gutter');
}
</style>
