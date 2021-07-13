import BaseModel from "./BaseModel"

export default class CovidStats extends BaseModel {
  constructor() {
    super()
    this.icon = 'mdi-virus'
    this.title = 'Covid Stats'
    this.path = '/covid-stats'
    this.description = 'Check the covid-19 statistics on every country'
    this.data = {
      countries: [],
      country: '',
      url: '',
      result: null
    }
  }
}