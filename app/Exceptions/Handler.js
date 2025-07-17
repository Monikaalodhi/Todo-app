'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP request.
   */
  async handle (error, { request, response }) {
    console.error(' Unhandled Exception:', error)

    response.status(error.status || 500).send({
      status: error.status || 500,
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }

  /**
   * Report exception for logging or debugging.
   */
  async report (error, { request }) {
    console.error(' Reporting Error:', error)
  }
}

module.exports = ExceptionHandler