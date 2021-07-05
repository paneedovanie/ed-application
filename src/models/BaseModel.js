export default class BaseModel {
  constructor() {
    this.icon = ''
    this.title = ''
    this.path = ''
    this.description = ''
    this.data = {}
    this.isLoading = false
    this.isPrestine = true
    this.errors = null
    this.messages = null
  }

  load (val = true) {
    this.isLoading = val
  }

  prestine (val = true) {
    this.isPrestine = val
  }

  setErrors (val) {
    this.errors = val
  }

  setMessages (val) {
    this.messages = val
  }
}