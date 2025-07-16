'use strict'

const Route = use('Route')

// ✅ AUTH Routes
Route.post('register', 'UserController.register')
Route.post('login', 'UserController.login')

// ✅ TODOS CRUD Routes — protect with auth middleware
Route.group(() => {
  Route.get('todos', 'TodoController.index')     // List todos (with pagination)
  Route.post('todos', 'TodoController.store')    // Create todo
  Route.put('todos/:id', 'TodoController.update')// Update todo
  Route.delete('todos/:id', 'TodoController.destroy') // Delete todo
}).middleware(['auth'])
