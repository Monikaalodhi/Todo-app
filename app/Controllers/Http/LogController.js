'use strict'

const Log = use('App/Models/Log')

class LogController {
  // 🔒 Authenticated user ke logs
  async index({ auth, response }) {
    try {
      const logs = await Log
        .query()
        .where('user_id', auth.user.id)
        .orderBy('created_at', 'desc')
        .fetch()

      return response.json(logs)
    } catch (error) {
      return response.status(500).json({
        message: 'Failed to fetch logs',
        error: error.message
      })
    }
  }

  // 🌐 Public endpoint - sabhi users ke logs
  async publicIndex({ response }) {
    try {
      const logs = await Log
        .query()
        .orderBy('created_at', 'desc')
        .fetch()

      return response.json(logs)
    } catch (error) {
      return response.status(500).json({
        message: 'Failed to fetch all logs',
        error: error.message
      })
    }
  }
}

module.exports = LogController
