const { ERROR_CODES } = require("../../errors/ERROR_CODES");
const UserService = require("../../services/UserService");
const bcrypt = require("bcrypt");
const JwtAuth = require("../middleware/AllowRoute");
const UserController = (() => {
  return {
    getUsers: async (req, res) => {
      var response = {};
      try {
        const results = await UserService.getUsers();
        response.statusCode = 200;
        response.message = "done";
        response.data = results;
      } catch (err) {
        response.statusCode = 500;
        response.message = "something went wrong";
      } finally {
        var data = response.data ? response.data : [];
        res.status(response.statusCode).json({
          message: response.message,
          data: data,
        });
      }
    },
    addUser: async (req, res) => {
      var response = {};
      const { userName, email, phoneNumber, securityPin, licenceNumber } = req.body;
      try {
        if (req.body && req.body.email) {
          // const passwordHash = bcrypt.hashSync(password, 10);
          const users = await UserService.getUserByUsername({
            email: req.body.email,
          });
          if (users == null) {
            let saveContent = {
              userName: userName,
              email: email,
              phoneNumber: phoneNumber,
              securityPin: securityPin,
              licenceNumber: licenceNumber
            };
            await UserService.addUser(saveContent)
              .then((res) => {                
                response.statusCode = 200;
                response.message = "successfully registered";
              })
              .catch(() => {
                response.statusCode = 500;
                response.message = "something is missing";
              });
          } else {
            response.statusCode = 400;
            response.message = "email already exists";
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
    findUser: async (req, res) => {
      var response = {};
      // const email = req.body.email
      const phoneNumber = req.body.phoneNumber

      if (phoneNumber) {
        const results = await UserService.findUser({ phoneNumber });
        response.statusCode = 200;
        response.message = "done";
        response.data = results;
      } else {
        response.statusCode = 400;
        response.message = "something went wrong";
        response.data = []
      }
      res.status(response.statusCode).json({
        message: response.message,
        data: response.data
      });
    },

    login: async (req, res) => {
      var response = {};
      const { phoneNumber, securityPin } = req.body;
      try {
        if (phoneNumber && securityPin) {
          const user = await UserService.getUserByUsername({
            phoneNumber: phoneNumber,
            securityPin: securityPin
          });
          if (user) {
            const token = await JwtAuth.checkUserAndGenerateToken(user);
            response.message = "login success";
            response.statusCode = 202;
            response.data = {
              accessToken: token,
              phoneNumber: phoneNumber,
              securityPin: securityPin
            };
          } else {
            response.message = "password or email is incorrect";
            response.statusCode = 400;
          }
        } else {
          response.message = "password or email is incorrect";
          response.statusCode = 400;
        }
      } catch (err) {
        response.message = "internal error";
        response.statusCode = 500;
      } finally {
        var data = response.data ? response.data : [];
        res.status(response.statusCode).json({
          message: response.message,
          data: data,
        });
      }
    },

    editUser: async (req, res) => {
      var response = {};
      const { find, update } = req.body;
      try {
        if (req.body && { find, update }) {
          const users = await UserService.getUserByUsername(find);
          if (users != null) {
            await UserService.edituser(find, update)
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

    deleteUser: async (req, res) => {
      var response = {};
      const params = { ...req.body };
      try {
        if (req.body && params) {
          const users = await UserService.getUserByUsername(params);
          if (users != null) {
            await UserService.deleteUser(users)
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
            response.message = "username not found";
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
  };
})();

module.exports = UserController;
