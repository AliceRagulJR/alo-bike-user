const TaskRepository = require("../repositories/TaskRepository");
const axios = require("axios");


const TaskService = (() => {
  return {
    getTasks: async () => {
      return TaskRepository.getTasks();
    },
    getTaskByParams: (userTask) => {
      if(!userTask){
         throw new Error("username is empty")
      }
      return TaskRepository.getTaskByParams(userTask)
    },
    addTask: async (data) => {
      return await TaskRepository.addTask(data)
    },
    editTask: async (find, update) => {
      return await TaskRepository.editTask(find, update);
    },
    deleteTask : async (data) => {
      return await TaskRepository.deleteTask(data)
    }
  };
})();

module.exports = TaskService;
