'use strict'

const Route = use('Route')
Route.get('logs/all', 'LogController.publicIndex')

// ✅ AUTH Routes
Route.post('register', 'UserController.register').validator('User')

Route.post('login', 'UserController.login')

// ✅ TODOS CRUD Routes — protect with auth middleware
Route.group(() => {
  Route.get('todos', 'TodoController.index')     // List todos (with pagination)
  Route.post('todos', 'TodoController.store').validator('CreateTodo') // Create todo
  Route.put('todos/:id', 'TodoController.update')// Update todo
  Route.delete('todos/:id', 'TodoController.destroy') // Delete todo
//  Logs route 
  Route.get('logs', 'LogController.index')
}).middleware(['auth'])
