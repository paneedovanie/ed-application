<template>
  <div class="free-message">
    <page-header :title="freeMessage.title" :description="freeMessage.description"></page-header>
    <form class="free-message__content" @submit.prevent="submit">
      <div class="free-message__content__message" v-if="freeMessage.messages">
        <span v-text="freeMessage.messages"></span>
      </div>
      <div class="free-message__content__error" v-if="freeMessage.errors">
        <span v-text="freeMessage.errors"></span>
      </div>
      <div class="free-message__content__to">
        <f-input 
          @input="input" 
          placeholder="Receivers 'seperated by comma (,)'"
          type="text" 
          v-model="freeMessage.data.to" 
        />
      </div>
      <div class="free-message__content__from">
        <f-input 
          @input="input" 
          placeholder="Your name"
          type="text" 
          v-model="freeMessage.data.from" 
        />
      </div>
      <div class="free-message__content__message">
        <f-textarea 
          @input="input" 
          placeholder="Your message"
          type="text" 
          v-model="freeMessage.data.message" 
        />
      </div>
      <div class="free-message__content__button">
        <f-button
          :disabled="freeMessage.isPrestine"
          type="submit"
        >Send</f-button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import FreeMessage from '@/models/FreeMessage'

export default {
  data: () =>({
    freeMessage: new FreeMessage
  }),

  methods: {
    input () {
      let isPrestine = true
      if(
        this.freeMessage.data.to !== '' &&
        this.freeMessage.data.from !== '' &&
        this.freeMessage.data.message !== ''
      ) isPrestine = false

      this.freeMessage.prestine(isPrestine)
    },

    submit () {
      var options = {
  method: 'GET',
  url: 'https://ytgrabber.p.rapidapi.com/app/get/YfcYPyxXVCo',
  headers: {
    'x-rapidapi-key': '7d9619f143msh24592fddafaec94p1fa905jsn47ab68d6c1a5',
    'x-rapidapi-host': 'ytgrabber.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
    }
  }
}
</script>