import BaseModel from "./BaseModel"

export default class ShortLink extends BaseModel {
  constructor() {
    super()
    this.icon = 'mdi-text-short'
    this.title = 'Short Link'
    this.path = '/short-link'
    this.description = 'Generate a short link for your URL'
    this.data = {
      url: '',
      result: null
    }
  }
}