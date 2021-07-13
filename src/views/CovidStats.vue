<template>
  <div class="covid-stats">
    <page-header :title="covidStats.title" :description="covidStats.description"></page-header>
    <form 
      :disabled="covidStats.isLoading"
      @submit.prevent="submit" 
      class="covid-stats__content" 
    >
      <div class="covid-stats__content__message" v-if="covidStats.messages">
        <span v-text="covidStats.messages"></span>
      </div>
      <div class="covid-stats__content__error" v-if="covidStats.errors">
        <span v-text="covidStats.errors"></span>
      </div>
      <div class="covid-stats__content__input">
        <f-select
          :items="covidStats.data.countries"
          v-model="covidStats.data.country"
          ref="country"
          :disabled="covidStats.isLoading"
        ></f-select>
      </div>
      <div class="covid-stats__content__result" v-if="result">
        <template v-for="(item,i) in result">
          <div :key="i">
            <h2 class="covid-stats__content__result__location">
              <span class="covid-stats__content__result__location__country" v-text="item.country"></span> <div class="covid-stats__content__result__location__continent" v-text="item.continent"></div>
            </h2>
              <v-row>
                <v-col cols="12" md="6">
                  <table class="covid-stats__content__result__table" >
                    <tbody>
                      <tr>
                        <td class="label">
                          <span v-text="'Population: '"></span>
                        </td>
                        <td class="data">
                          <span v-text="item.population || 0"></span>
                        </td>
                      </tr>
                      <tr>
                        <td class="label">
                          <span v-text="'New: '"></span>
                        </td>
                        <td class="data text-error">
                          <span v-text="item.cases.new || 0"></span>
                        </td>
                      </tr>
                      <tr>
                        <td class="label">
                          <span v-text="'Active: '"></span>
                        </td>
                        <td class="data text-secondary">
                          <span v-text="item.cases.active || 0"></span>
                        </td>
                      </tr>
                      <tr>
                        <td class="label">
                          <span v-text="'Critical: '"></span>
                        </td>
                        <td class="data text-error">
                          <span v-text="item.cases.critical || 0"></span>
                        </td>
                      </tr>
                      <tr>
                        <td class="label">
                          <span v-text="'Recovered: '"></span>
                        </td>
                        <td class="data text-success">
                          <span v-text="item.cases.recovered || 0"></span>
                        </td>
                      </tr>
                      <tr>
                        <td class="label">
                          <span v-text="'Confirmed: '"></span>
                        </td>
                        <td class="data text-secondary">
                          <span v-text="item.cases.total"></span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
                <v-col cols="12" md="6" class="text-center">
                  <h4 class="text-secondary">Recovery</h4>
                  <span class="text-success percent">{{((item.cases.recovered / item.cases.total) * 100).toFixed(2)}}%</span>
                </v-col>
              </v-row>
          </div>
        </template>
      </div>
      Powered by <a href="https://rapidapi.com/api-sports/api/covid-193/" target="__blank">rapidapi.com</a>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import CovidStats from '@/models/CovidStats'

export default {
  computed: {
    result () {
      return this.covidStats.data.result
    }
  },

  data: () => ({
    covidStats: new CovidStats
  }),

  methods: {
    input () {
      let isPrestine = true
      if(this.covidStats.data.code !== '') isPrestine = false
      this.covidStats.prestine(isPrestine)
      this.covidStats.data.result = null
      this.covidStats.setMessages(null)
    },
    
    submit () {
      this.covidStats.load()
      this.covidStats.setErrors(null)
      
      const OPTIONS = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics',
        params: {country: this.covidStats.data.country},
        headers: {
          'x-rapidapi-key': '7d9619f143msh24592fddafaec94p1fa905jsn47ab68d6c1a5',
          'x-rapidapi-host': 'covid-193.p.rapidapi.com'
        }
      };

      axios.request(OPTIONS).then(response => {
        this.covidStats.data.result = response.data.response
      }).catch(error => {
        this.covidStats.setErrors(error.response.data.description)
      }).finally(() => {
        this.covidStats.load(false)
        this.covidStats.prestine()
      })
    },
    
    getCountries () {
      this.covidStats.load()

      const OPTIONS = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/countries',
        headers: {
          'x-rapidapi-key': '7d9619f143msh24592fddafaec94p1fa905jsn47ab68d6c1a5',
          'x-rapidapi-host': 'covid-193.p.rapidapi.com'
        }
      };

      axios.request(OPTIONS).then(response => {
        this.covidStats.data.countries = response.data.response
      }).catch(error => {
        this.covidStats.setErrors(error.response.data.description)
      }).finally(() => {
        this.covidStats.load(false)
      })
    }
  },

  mounted () {
    this.getCountries()
    this.$refs.country.$el.addEventListener('change', () => {
      this.submit()
    })
  }
}
</script>