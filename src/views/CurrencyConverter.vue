<template>
  <div class="currency-converter">
    <page-header :title="currencyConverter.title" :description="currencyConverter.description"></page-header>
    <form class="currency-converter__content" @submit.prevent="submit">
      <div class="currency-converter__content__message" v-if="currencyConverter.messages">
        <span v-text="currencyConverter.messages"></span>
      </div>
      <div class="currency-converter__content__error" v-if="currencyConverter.errors">
        <span v-text="currencyConverter.errors"></span>
      </div>
      <div class="currency-converter__content__currencies">
        <v-row>
          <v-col>
            <f-input 
              @input="input" 
              placeholder="From (Currency)"
              type="text" 
              v-model="currencyConverter.data.from" 
            />
          </v-col>
          <v-col>
            <f-input 
              @input="input" 
              placeholder="To (Currency)"
              type="text" 
              v-model="currencyConverter.data.to" 
            />
          </v-col>
        </v-row>
      </div>
      <div class="currency-converter__content__values">
        <v-row>
          <v-col>
            <f-input 
              @input="input" 
              placeholder="From (Amount)"
              type="text" 
              v-model="currencyConverter.data.amount" 
            />
          </v-col>
          <v-col>
            <f-input 
              v-if="result"
              @input="input" 
              placeholder="To (Amount)"
              readonly
              type="text" 
              v-model="result.new_amount" 
            />
          </v-col>
        </v-row>
      </div>
      <div class="currency-converter__content__button">
        <f-button
          :disabled="currencyConverter.isPrestine || currencyConverter.isLoading"
          type="submit"
        >Convert</f-button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import CurrencyConverter from '@/models/CurrencyConverter'

export default {
  computed: {
    result () {
      return this.currencyConverter.data.result
    }
  },

  data: () =>({
    currencyConverter: new CurrencyConverter
  }),

  methods: {
    input () {
      let isPrestine = true
      if(
        this.currencyConverter.data.to !== '' &&
        this.currencyConverter.data.from !== '' &&
        this.currencyConverter.data.amount !== ''
      ) isPrestine = false

      this.currencyConverter.prestine(isPrestine)
    },

    submit () {
      this.currencyConverter.load()
      this.currencyConverter.setErrors(null)

      var options = {
        method: 'GET',
        url: 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency',
        params: {
          have: this.currencyConverter.data.from, 
          want: this.currencyConverter.data.to, 
          amount: this.currencyConverter.data.amount
        },
        headers: {
          'x-rapidapi-key': '7d9619f143msh24592fddafaec94p1fa905jsn47ab68d6c1a5',
          'x-rapidapi-host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
        }
      };

      axios.request(options).then(response => {
        this.currencyConverter.data.result = response.data
      }).catch(error => {
        this.currencyConverter.setErrors(error.response.data.error)
      }).finally(() => {
        this.currencyConverter.load(false)
        this.currencyConverter.prestine()
      })
    }
  }
}
</script>