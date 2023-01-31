const { ERROR_CODES } = require("../errors/ERROR_CODES");
const UserDataError = require("../errors/UserDataError");
const {TaskSchema,validate} = require("./models/TaskSchema");
const DatabaseConfig = require("../config/DbConnection")


const TaskRepository = ( () => {
    return {
        getTasks: async () => {
            const conn = await DatabaseConfig.mongoDbConnect("_alo_bikeUser")
           const Tasks = conn.model("bikeDetails",TaskSchema)
             const task = await Tasks.find({})  
             return task
        },
        getTaskByParams: async (name) => {
          const conn = await DatabaseConfig.mongoDbConnect("_alo_bikeUser")
           const Tasks = conn.model("task",TaskSchema)
             const task = await Tasks.findOne(name)  
             return task
        },  
        addTask: async (userData) => {
            const conn = await  DatabaseConfig.mongoDbConnect("_alo_bikeUser")
            const Tasks = conn.model("bikeDetails",TaskSchema)
            const validUserData = validate(userData);
            if (!validUserData.error) {
                try {
                    const task = new Tasks(userData);
                    return await task.save()
                } catch (err) {
                    if (err && err.code === 11000) { // Duplicate record
                        throw new UserDataError({
                            message: err.message,
                            name: err.name,
                            code: ERROR_CODES.DUPLICATE_RECORD,
                            stack: err.stack
                        })
                    } else {
                        throw new UserDataError({
                            ...err,
                            code: ERROR_CODES.UNKNOWN
                        })
                     }
                }
            } else {
                throw new Error(validUserData.error);
            }
        },
        editTask: async (find,update) => {
            try {
              const conn = await DatabaseConfig.mongoDbConnect("alo_tracker")
              const Tasks = conn.model("task",TaskSchema)
              return await Tasks.updateOne(find,update)
            } catch (e) {
              throw new Error("user cannot be updated")
            }
        },
        deleteTask:async (params) => {
            try {
                const conn = await DatabaseConfig.mongoDbConnect("alo_tracker")
                const Tasks = conn.model("task",TaskSchema)
              return await Tasks.deleteOne(params)
            } catch (e) {
              throw new Error("user cannot be deleted")
            }
        }
    }
})();

module.exports = TaskRepository 