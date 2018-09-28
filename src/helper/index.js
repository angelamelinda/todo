export function mockData() {
    return {
      // example data from redux store
      listTask:{
        
      },
  
      // actions
      RequestAddTask:jest.fn(),
      RequestEditTask:jest.fn(),
      RequestDeleteTask:jest.fn(),
      RequestChangeStatus:jest.fn(),
      RequestGetAllTask:jest.fn()
    }
  }
  