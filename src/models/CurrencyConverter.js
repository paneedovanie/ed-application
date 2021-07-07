import BaseModel from "./BaseModel"

export default class CurrencyConverter extends BaseModel {
  constructor() {
    super()
    this.icon = 'mdi-cash'
    this.title = 'Currency Converter'
    this.path = '/currency-converter'
    this.description = 'Calculate currency and foreign exchange rates'
    this.data = {
      to: 'PHP',
      from: 'USD',
      amount: '',
      result: null
    }
  }
}