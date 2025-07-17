class CreateTodo {
  get rules () {
    return {
      title: 'required|min:3',
      description: 'required'
    }
  }

  get messages () {
    return {
      'title.required': 'Title is required',
      'description.required': 'Description is required'
    }
  }
}
