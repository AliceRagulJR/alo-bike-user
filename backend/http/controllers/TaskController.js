const TaskService = require("../../services/TaskService");

const TaskController = (() => {
  return {
    getTask: async (req, res) => {
      var response = {}
      try {
        const results = await TaskService.getTasks()
        response.statusCode = 200;
        response.message = "done";
        response.data = results
      }
      catch (err) {
        response.statusCode = 500;
        response.message = "something went wrong";
      }
      finally {
        res.status(response.statusCode).json({
          message: response.message,
          data: response.data
        });
      }
    },
    addTask: async (req, res) => {
      var response = {};
      const {
        currentDate,
        startingKm,
        endingKm,
        petrolAmount,
        otherCharges,
        collectionAboutToday,
        cashInHand,
        depositAmount,
        dailyBeta,
        name
      } = req.body;

      const saveContent = { ...req.body }
      try {
        if (req.body) {
          const findTask = await TaskService.getTaskByParams(saveContent);
          if (findTask == null) {
            let saveContent = {
              currentDate: currentDate,
              startingKm: startingKm,
              endingKm: endingKm,
              petrolAmount: petrolAmount,
              otherCharges: otherCharges,
              collectionAboutToday: collectionAboutToday,
              cashInHand: cashInHand,
              depositAmount: depositAmount,
              dailyBeta: dailyBeta,
              name: name
            };
            await TaskService.addTask(saveContent)
              .then(() => {
                response.statusCode = 200;
                response.message = "successfully added";
              })
              .catch(() => {
                response.statusCode = 500;
                response.message = "something is missing";
              });
          } else {
            response.statusCode = 400;
            response.message = "Already exist";
          }
        }
      } catch (err) {
        response.statusCode = 400;
        response.message = "something went wrong";
      } finally {
        // console.log("finally")
        res.status(response.statusCode).json({
          message: response.message,
        });
      }
    },

    editTask: async (req, res) => {
      var response = {};
      const { find, update } = req.body;
      try {
        if (req.body && (find && update)) {
          const task = await TaskService.getTaskByParams(find);
          if (task != null) {
            await TaskService.editTask(find, update)
              .then(() => {
                response.statusCode = 200;
                response.message = "successfully updated";
              })
              .catch(() => {
                response.statusCode = 500;
                response.message = "something is missing";
              });
          } else {
            response.statusCode = 400;
            response.message = "Not found";
          }
        }
      } catch (err) {
        response.statusCode = 400;
        response.message = "something went wrong";
      } finally {
        res.status(response.statusCode).json({
          message: response.message,
        });
      }
    },

    deleteTask: async (req, res) => {
      var response = {};
      const params = { ...req.body };
      try {
        if (req.body && params) {
          const Task = await TaskService.getTaskByParams(params);
          if (Task != null) {
            await TaskService.deleteTask(Task)
              .then(() => {
                response.statusCode = 200;
                response.message = "successfully deleted";
              })
              .catch(() => {
                response.statusCode = 500;
                response.message = "something is missing";
              });
          } else {
            response.statusCode = 400;
            response.message = "Task not found";
          }
        }
      } catch (err) {
        response.statusCode = 400;
        response.message = "something went wrong";
      } finally {
        res.status(response.statusCode).json({
          message: response.message,
        });
      }
    }
  }
})();

module.exports = TaskController;