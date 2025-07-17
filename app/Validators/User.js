'use strict'

class User {
  get rules () {
    return {
      username: 'required|min:3',
      email: 'required|email|unique:users,email',
      password: 'required|min:6'
    }
  }

  get messages () {
    return {
      'username.required': 'Username is required',
      'email.required': 'Email is required',
      'email.email': 'Enter a valid email',
      'email.unique': 'Email already exists',
      'password.required': 'Password is required',
      'password.min': 'Password must be at least 6 characters'
    }
  }
}

module.exports = User
