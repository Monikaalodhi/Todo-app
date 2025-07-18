class CreateTodo {
  get rules () {
    return {
      title: 'required|min:3',
      description: 'required',
      status: 'required|in:pending,in_progress,completed,cancelled',
      priority: 'required|in:low,medium,high'
    }
  }

  get messages () {
    return {
      'title.required': 'Title is required',
      'description.required': 'Description is required',
      'status.required': 'Status is required',
      'status.in': 'Status must be one of: pending, in_progress, completed, cancelled',
      'priority.required': 'Priority is required',
      'priority.in': 'Priority must be one of: low, medium, high'
    }
  }
}
