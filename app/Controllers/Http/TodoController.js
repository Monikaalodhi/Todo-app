'use strict'

const Todo = use('App/Models/Todo')
const Log = use('App/Models/Log')  // 👈 Added log model import

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

    // 🔹 Create log after todo creation
    await Log.create({
      user_id: auth.user.id,
      action: `Created Todo: ${todo.title}`
    })

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

    // 🔹 Create log after update
    await Log.create({
      user_id: auth.user.id,
      action: `Updated Todo: ${todo.title}`
    })

    return response.json(todo)
  }

  // Delete todo
  async destroy({ params, response, auth }) {
    const todo = await Todo.findOrFail(params.id)
    if (todo.user_id !== auth.user.id) {
      return response.unauthorized()
    }

    // 🔹 Save title before delete for logging
    const title = todo.title
    await todo.delete()

    // 🔹 Create log after delete
    await Log.create({
      user_id: auth.user.id,
      action: `Deleted Todo: ${title}`
    })

    return response.json({ message: 'Todo deleted' })
  }

}

module.exports = TodoController
