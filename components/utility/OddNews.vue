<template>
  <div id="mc_embed_signup">
    <form
      action="https://oddbird.us19.list-manage.com/subscribe/post?u=80219aa68d7bad77b9fd2eb93&amp;id=7c27f7fb9a"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      class="validate"
      target="_blank"
      novalidate
      data-form="email-subscribe"
    >
      <form-input
        field="news-email"
        id="mce-EMAIL"
        name="EMAIL"
        value=""
        type="email"
        :label="label"
      />

      <ul class="is-hidden">
          <li
            v-for="group in groups"
            :key="group.value"
          >
            <label
              :for="`mce-group[2075]-2075-${group.value}`"
            >
              <input
                type="checkbox"
                :value="`${group.value}`"
                :name="`group[2075][${group.value}]`"
                :id="`mce-group[2075]-2075-${group.value}`"
                :checked="has_interest(group.key)"
              >
              {{ group.label }}
            </label>
          </li>
      </ul>

      <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
      <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_80219aa68d7bad77b9fd2eb93_7c27f7fb9a" tabindex="-1" value=""></div>

      <div data-actions>
        <button-style
          type="submit"
          id="mc-embedded-subscribe"
          :content="action"
          name="subscribe"
        />
      </div>
    </form>
  </div>
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
      label: {
        type: String,
        default: 'Sign up for our developer newsletter'
      },
      action: {
        type: String,
        default: 'Subscribe'
      },
      interests: {
        type: [String, Array],
        default: 'oddnews'
      },
    },
    data() {
      return {
        groups: [
          {
            'key': 'oddbooks',
            'label': 'OddBooks',
            'value': 1,
          },
          {
            'key': 'book_tester',
            'label': 'OddBooks Tester',
            'value': 2,
          },
          {
            'key': 'oddnews',
            'label': 'OddNews',
            'value': 4,
          },
          {
            'key': 'vueconfus19',
            'label': 'Event: VueConf US 2019',
            'value': 8,
          },
        ],
      }
    },
    methods: {
      has_interest(group) {
        const show = (typeof this.interests === 'string')
          ? [this.interests]
          : this.interests;

        return show.includes(group);
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
