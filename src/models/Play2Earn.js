import BaseModel from "./BaseModel"

export default class YTDownloader extends BaseModel {
  constructor() {
    super()
    this.icon = 'mdi-controller-classic'
    this.title = 'Play to Earn'
    this.path = '/play-2-earn'
    this.description = 'Earn money by playing games'
    this.data = {
      code: '',
      result: null
    }
  }
}