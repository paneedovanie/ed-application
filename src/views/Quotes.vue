<template>
  <div class="quotes">
    <page-header :title="quotes.title" :description="quotes.description"></page-header>
    <form 
      :disabled="quotes.isLoading"
      @submit.prevent="submit" 
      class="quotes__content" 
    >
      <div class="quotes__content__message" v-if="quotes.messages">
        <span v-text="quotes.messages"></span>
      </div>
      <div class="quotes__content__error" v-if="quotes.errors">
        <span v-text="quotes.errors"></span>
      </div>
      <div class="quotes__content__result" v-if="result">
        <div class="quotes__content__result__phrase"
          role="textbox" 
        >
          <p>"<i v-text="result.content"></i>" - <span v-text="result.originator.name"></span></p>
        </div>
        <!-- <f-input 
          :value="result.link" 
          readonly 
          ref="link" 
          type="text" 
        /> -->
      </div>
      <div class="quotes__content__button">
        <f-button
          :disabled="quotes.isLoading"
          class="generate"
          type="submit"
        >Generate</f-button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Quotes from '@/models/Quotes'

export default {
  computed: {
    result () {
      return this.quotes.data.result
    }
  },

  data: () => ({
    quotes: new Quotes
  }),

  methods: {
    copy () {
      const link = this.$refs.link 
      link.select()
      link.setSelectionRange(0, 99999)
      document.execCommand("copy");
      this.quotes.setMessages('Copied: ' + link.value)
    },
    
    submit () {
      this.quotes.load()
      this.quotes.setErrors(null)

      const OPTIONS = {
        method: 'GET',
          url: 'https://quotes15.p.rapidapi.com/quotes/random/',
          params: {language_code: 'en'},
          headers: {
            'x-rapidapi-key': '7d9619f143msh24592fddafaec94p1fa905jsn47ab68d6c1a5',
            'x-rapidapi-host': 'quotes15.p.rapidapi.com'
          }
        }

      axios.request(OPTIONS).then(response => {
        this.quotes.data.result = response.data
      }).catch(error => {
        this.quotes.setErrors(error.response.data.description)
      }).finally(() => {
        this.quotes.load(false)
      })
    }
  }
}
</script>