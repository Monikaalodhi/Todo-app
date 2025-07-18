class UpdateTodo {
  get rules () {
    return {
      title: 'min:3',
      description: 'min:5',
      status: 'in:pending,inprogress,complete,cancel',
      priority: 'in:low,medium,high'
    }
  }

  get messages () {
    return {
      'title.min': 'Title must be at least 3 characters.',
      'description.min': 'Description must be at least 5 characters.',
      'status.in': 'Status must be one of: pending, inprogress, complete, or cancel.',
      'priority.in': 'Priority must be one of: low, medium, or high.'
    }
  }
}

module.exports = UpdateTodo
