<template>
  <div class="short-link">
    <page-header :title="shortLink.title" :description="shortLink.description"></page-header>
    <form 
      :disabled="shortLink.isLoading"
      @submit.prevent="submit" 
      class="short-link__content" 
    >
      <div class="short-link__content__message" v-if="shortLink.messages">
        <span v-text="shortLink.messages"></span>
      </div>
      <div class="short-link__content__error" v-if="shortLink.errors">
        <span v-text="shortLink.errors"></span>
      </div>
      <div class="short-link__content__input">
        <f-input 
          :disabled="shortLink.isLoading"
          @input="input" 
          placeholder="Your URL here" 
          type="text" 
          v-model="shortLink.data.url" 
        />
      </div>
      <div class="short-link__content__button">
        <f-button
          :disabled="shortLink.isPrestine || shortLink.isLoading"
          class="generate"
          type="submit"
          v-if="!result"
        >Generate</f-button>
        <f-button
          @click="copy" 
          class="copy"
          v-else
        >Copy</f-button>
      </div>
      <div class="short-link__content__result" v-if="result">
        <f-input 
          :value="result.link" 
          readonly 
          ref="link" 
          type="text" 
        />
      </div>
      Powered by <a href="https://bitly.com" target="__blank">bitly.com</a>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import ShortLink from '@/models/ShortLink'

export default {
  computed: {
    result () {
      return this.shortLink.data.result
    }
  },

  data: () => ({
    shortLink: new ShortLink
  }),

  methods: {
    copy () {
      const link = this.$refs.link 
      link.select()
      link.setSelectionRange(0, 99999)
      document.execCommand("copy");
      this.shortLink.setMessages('Copied: ' + link.value)
    },

    input () {
      let isPrestine = true
      if(this.shortLink.data.url !== '') isPrestine = false
      this.shortLink.prestine(isPrestine)
      this.shortLink.data.result = null
      this.shortLink.setMessages(null)
    },
    
    submit () {
      this.shortLink.load()
      this.shortLink.setErrors(null)

      const OPTIONS = {
        method: 'POST',
        url: 'https://api-ssl.bitly.com/v4/shorten',
        headers: {
          'Authorization': 'Bearer 49ac812baca01bcefaa85a9d8570cff109f4b49d',
          'Content-Type': 'application/json' 
        },
        data: {
          "long_url": this.shortLink.data.url,
          "domain": "bit.ly",
          // "group_guid": "Ba1bc23dE4F"
        }
      };

      axios.request(OPTIONS).then(response => {
        this.shortLink.data.result = response.data
      }).catch(error => {
        this.shortLink.setErrors(error.response.data.description)
      }).finally(() => {
        this.shortLink.load(false)
        this.shortLink.prestine()
      })
    }
  }
}
</script>