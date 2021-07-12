import BaseModel from "./BaseModel"

export default class YTDownloader extends BaseModel {
  constructor() {
    super()
    this.icon = 'mdi-youtube'
    this.title = 'Youtube Downloader'
    this.path = '/yt-downloader'
    this.description = 'Generate a download link for youtube video'
    this.data = {
      code: '',
      result: null
    }
  }
}