<template>
  <form
    data-form="contact"
    data-part="contact-form"
    :action="`https://formspree.io/${slide.data.form.email}`"
    method="POST">

    <h4
      class="form-header"
      data-form-span
    >
      Stay in touch…
    </h4>

    <input type="hidden"
      name="_next"
      :value="slide.data.form.next" />
    <input type="text"
      name="_gotcha"
      style="display:none" />

    <form-input
      field="contact-name"
      label="Name"
    />

    <form-input
      id="_replyto"
      field="contact-email"
      type="email"
      label="Email Address"
    />

    <form-input
      field="contact-message"
      type="textarea"
      label="Message"
      data-form-span
    />

    <div data-actions>
      <button-style
        type="submit"
        id="contact-submit"
        :content="slide.data.form.submit"
      />
    </div>
  </form>
</template>

<script>
  import ButtonStyle from '~/components/utility/ButtonStyle.vue';
  import FormInput from '~/components/utility/FormInput.vue';

  export default {
    components: {
      ButtonStyle,
      FormInput,
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
      listen(value) {
        this.meta.listen = value;
      }
    },
  }
</script>

<style lang="scss" scoped>
[data-part='contact-form'] {
  align-self: center;
  margin: 0 auto;
  max-width: size('wide');
  padding: size('gutter');
  width: 100%;
}
</style>
