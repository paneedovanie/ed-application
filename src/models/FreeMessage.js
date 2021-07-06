import BaseModel from "./BaseModel"

export default class ShortLink extends BaseModel {
  constructor() {
    super()
    this.icon = 'mdi-message'
    this.title = 'Free Message'
    this.path = '/free-message'
    this.description = 'Send a text message for free'
    this.data = {
      to: '',
      from: '',
      message: '',
    }
  }
}