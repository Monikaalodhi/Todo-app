'use strict'

const Schema = use('Schema')

class AddStatusPriorityToTodosSchema extends Schema {
  up () {
    this.table('todos', (table) => {
      table.enu('status', ['pending', 'in_progress', 'completed', 'cancelled']).defaultTo('pending')
      table.enu('priority', ['low', 'medium', 'high']).defaultTo('medium')
    })
  }

  down () {
    this.table('todos', (table) => {
      table.dropColumn('status')
      table.dropColumn('priority')
    })
  }
}

module.exports = AddStatusPriorityToTodosSchema
