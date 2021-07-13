<template>
  <div class="yt-downloader">
    <page-header :title="yTDownloader.title" :description="yTDownloader.description"></page-header>
    <form 
      :disabled="yTDownloader.isLoading"
      @submit.prevent="submit" 
      class="yt-downloader__content" 
    >
      <div class="yt-downloader__content__message" v-if="yTDownloader.messages">
        <span v-text="yTDownloader.messages"></span>
      </div>
      <div class="yt-downloader__content__error" v-if="yTDownloader.errors">
        <span v-text="yTDownloader.errors"></span>
      </div>
      <div class="yt-downloader__content__input">
        <f-input 
          :disabled="yTDownloader.isLoading"
          @input="input" 
          placeholder="Youtube code here" 
          type="text" 
          v-model="yTDownloader.data.code" 
        />
      </div>
      <div class="yt-downloader__content__button">
        <f-button
          :disabled="yTDownloader.isPrestine || yTDownloader.isLoading"
          class="generate"
          type="submit"
        >Generate</f-button>
      </div>
      <div class="yt-downloader__content__result" v-if="result">
        <h3 v-text="result.message"></h3>
        <h3 v-text="result.VideoTitle"></h3>
        <p v-text="result.VideoTags"></p>
        <template v-for="(item,i) in result.AllFormats">
          <p :key="i" class="yt-downloader__content__result__link">
            <span v-text="item.Quality" class="quality"></span>
            <span v-text="item.Extension" class="extension"></span>
            <a :href="item.Link" v-text="`Download`"></a></p>
        </template>
      </div>
      Powered by <a href="https://rapidapi.com/Prasadbro/api/youtube-video-info/" target="__blank">rapidapi.com</a>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import YTDownloader from '@/models/YTDownloader'

export default {
  computed: {
    result () {
      return this.yTDownloader.data.result
    }
  },

  data: () => ({
    yTDownloader: new YTDownloader
  }),

  methods: {
    input () {
      let isPrestine = true
      if(this.yTDownloader.data.code !== '') isPrestine = false
      this.yTDownloader.prestine(isPrestine)
      this.yTDownloader.data.result = null
      this.yTDownloader.setMessages(null)
    },
    
    submit () {
      this.yTDownloader.load()
      this.yTDownloader.setErrors(null)
      
      const OPTIONS = {
        method: 'GET',
        url: 'https://youtube-video-info.p.rapidapi.com/video_formats',
        params: {video: this.yTDownloader.data.code},
        headers: {
          'x-rapidapi-key': '7d9619f143msh24592fddafaec94p1fa905jsn47ab68d6c1a5',
          'x-rapidapi-host': 'youtube-video-info.p.rapidapi.com'
        }
      };

      axios.request(OPTIONS).then(response => {
        this.yTDownloader.data.result = response.data
      }).catch(error => {
        this.yTDownloader.setErrors(error.response.data.description)
      }).finally(() => {
        this.yTDownloader.load(false)
        this.yTDownloader.prestine()
      })
    }
  }
}
</script>