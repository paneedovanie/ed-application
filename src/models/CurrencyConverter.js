import BaseModel from "./BaseModel"

export default class ShortLink extends BaseModel {
  constructor() {
    super()
    this.icon = 'mdi-cash'
    this.title = 'Currency Converter'
    this.path = '/currency-converter'
    this.description = 'Calculate currency and foreign exchange rates'
    this.data = {
      to: '',
      from: '',
      amount: '',
      result: null
    }
  }
}