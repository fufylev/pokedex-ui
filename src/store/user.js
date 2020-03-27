import { action, configure, decorate, observable } from 'mobx'
import { auth, register } from '../utils/API'

configure({ enforceActions: 'observed' })

class User {
  constructor () {
    this.isLoggedIn = false
    this.isRegistered = false
    this.error = ''
    this.token = ''
    this.name = ''
    this.email = ''
  }

  setLoggedIn () {
    this.isLoggedIn = true
  }

  setIsRegistered () {
    this.isRegistered = true
  }

  clearStore () {
    this.isLoggedIn = false
    this.isRegistered = false
    this.error = ''
  }

  setError (error) {
    this.error = error
    console.log(error)
  }

  setUser ({ token, name, email }) {
    this.token = token
    this.name = name
    this.email = email
  }

  registerUser ({ email, password, name, mobile }) {
    register(email, password, name, mobile).then(response => {
      console.log(response)
      if (response.data.result === 'success') {
        this.setIsRegistered()
      } else {
        this.setError(response.data.result)
      }
    })
      .catch(error => this.setError(error))
  }

  Authenticate ({ email, password }) {
    auth(email, password).then(response => {
      console.log(response)
      if (response.data.result === 'success') {
        this.setLoggedIn()
        this.setUser(response.data)
      } else {
        this.setError(response.data.result)
      }
    })
      .catch(error => this.setError(error))
  }
}

decorate(User, {
  setIsRegistered: action,
  setLoggedIn: action,
  setUser: action,
  setError: action,
  clearStore: action,
  isLoggedIn: observable,
  isRegistered: observable,
  token: observable,
  name: observable,
  email: observable,
  error: observable
})

export default new User()