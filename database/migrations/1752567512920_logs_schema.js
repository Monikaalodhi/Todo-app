'use strict'

const Schema = use('Schema')

class LogsSchema extends Schema {
  up () {
    this.create('logs', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('action').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('logs')
  }
}

module.exports = LogsSchema
