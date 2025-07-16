'use strict'

const Todo = use('App/Models/Todo')

class TodoController {

  // List todos with pagination
  async index({ request, response, auth }) {
    const page = request.input('page', 1)
    const todos = await Todo.query()
      .where('user_id', auth.user.id)
      .paginate(page, 10)
    return response.json(todos)
  }

  // Create todo with validation
  async store({ request, response, auth }) {
    const data = request.only(['title', 'description'])
    const todo = new Todo()
    todo.fill(data)
    todo.user_id = auth.user.id
    await todo.save()
    return response.json(todo)
  }

  // Update todo
  async update({ params, request, response, auth }) {
    const todo = await Todo.findOrFail(params.id)
    if (todo.user_id !== auth.user.id) {
      return response.unauthorized()
    }
    const data = request.only(['title', 'description', 'is_completed'])
    todo.merge(data)
    await todo.save()
    return response.json(todo)
  }

  // Delete todo
  async destroy({ params, response, auth }) {
    const todo = await Todo.findOrFail(params.id)
    if (todo.user_id !== auth.user.id) {
      return response.unauthorized()
    }
    await todo.delete()
    return response.json({ message: 'Todo deleted' })
  }

}

module.exports = TodoController
