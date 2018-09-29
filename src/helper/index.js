export function mockData() {
    return {
      // example data from redux store
      listTask:[
        {
          created_date: 1538188728269,
          name: "test mock",
          status: "On Going",
          _id: "5baee5b86d17d7190974e9f9"
        }, 
        {
          created_date: 1538189831020,
          name: "maa",
          status: "On Going",
          _id: "5baeea07e8637f2dd4eb7676"
        }
      ],
  
      // actions
      RequestAddTask:jest.fn(),
      RequestEditTask:jest.fn(),
      RequestDeleteTask:jest.fn(),
      RequestGetAllTask:jest.fn(),

      handleDelete: jest.fn(),
      
      isFetched: false
    }
  }
  