<template>
  <div class="play-2-earn">
    <page-header :title="play2Earn.title" :description="play2Earn.description"></page-header>
    <div class="play-2-earn__content">
      <!--Start rollercoin.com code-->
      <a href="https://rollercoin.com/?r=kr3fm40q">
        <img src="//rollercoin.com/static/img/public_img/gen2/w320h320.gif"/> 
      </a> 
      <!--End rollercoin.com code-->
      <p>
        Play Roller Coin to earn money by playing mini games.
      </p>
      <p><a a href="https://rollercoin.com/?r=kr3fm40q">Click to play</a></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Play2Earn from '@/models/Play2Earn'

export default {
  computed: {
    result () {
      return this.play2Earn.data.result
    }
  },

  data: () => ({
    play2Earn: new Play2Earn
  }),

  methods: {
    copy () {
      const link = this.$refs.link 
      link.select()
      link.setSelectionRange(0, 99999)
      document.execCommand("copy");
      this.play2Earn.setMessages('Copied: ' + link.value)
    },
    
    submit () {
      this.play2Earn.load()
      this.play2Earn.setErrors(null)

      const OPTIONS = {
        method: 'GET',
          url: 'https://play2Earn15.p.rapidapi.com/play2Earn/random/',
          params: {language_code: 'en'},
          headers: {
            'x-rapidapi-key': '7d9619f143msh24592fddafaec94p1fa905jsn47ab68d6c1a5',
            'x-rapidapi-host': 'play2Earn15.p.rapidapi.com'
          }
        }

      axios.request(OPTIONS).then(response => {
        this.play2Earn.data.result = response.data
      }).catch(error => {
        this.play2Earn.setErrors(error.response.data.description)
      }).finally(() => {
        this.play2Earn.load(false)
      })
    }
  }
}
</script>