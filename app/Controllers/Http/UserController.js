'use strict'

const User = use('App/Models/User')

class UserController {
  // Register a new user
  async register({ request, auth, response }) {
    const { username, email, password } = request.all()
    const user = await User.create({ username, email, password })
    const token = await auth.generate(user)
    return response.json({
      user,
      token
    })
  }

  // Login user
  async login({ request, auth, response }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    return response.json({
      message: 'Login successful',
      token
    })
  }

  // Logout user
  async logout({ auth, response }) {
    // Adonis auth JWT me logout ka concept nahi hota, bas token expire hota hai
    return response.json({
      message: 'Logout successful'
    })
  }
}

module.exports = UserController
