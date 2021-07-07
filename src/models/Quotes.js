import BaseModel from "./BaseModel"

export default class Quotes extends BaseModel {
  constructor() {
    super()
    this.icon = 'mdi-format-quote-open'
    this.title = 'Quotes'
    this.path = '/quotes'
    this.description = 'Generate a random quotes from different authors'
    this.data = {
      result: null
    }
  }
}