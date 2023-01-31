const { ERROR_CODES } = require("../errors/ERROR_CODES");
const UserDataError = require("../errors/UserDataError");
const { UserSchema, validate } = require("./models/UserSchema");
const DatabaseConfig = require("../config/DbConnection")


const UserRepository = (() => {
  return {
    getUsers: async () => {
      const conn = await DatabaseConfig.mongoDbConnect("_alo_bikeUser")
      const users = conn.model("user", UserSchema)
      const user = await users.find({})
      return user
    },
    findUser: async (phoneNumber) => {
      const conn = await DatabaseConfig.mongoDbConnect("_alo_bikeUser")
      const users = conn.model("user", UserSchema)
      const user = await users.findOne(phoneNumber, "userName email licenceNumber")
      return user
      
    },
    bikeDetails: async (userData) => {
      const conn = await DatabaseConfig.mongoDbConnect("_alo_bikeUser")
      const users = conn.model("user", UserSchema)
      const User = new users(userData);
      return await User.save()
    },
    getUserByUsername: async (phoneNumber) => {
      const conn = await DatabaseConfig.mongoDbConnect("_alo_bikeUser")
      const users = conn.model("user", UserSchema)
      const user = await users.findOne(phoneNumber)
      return user
    },
    addUser: async (userData) => {
      const conn = await DatabaseConfig.mongoDbConnect("_alo_bikeUser")
      const users = conn.model("user", UserSchema)
      const validUserData = validate(userData);
      if (!validUserData.error) {
        try {
          const User = new users(userData);
          return await User.save()
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
    edituser: async (find, update) => {
      try {
        const conn = await DatabaseConfig.mongoDbConnect("alo_tracker")
        const users = conn.model("user", UserSchema)
        return await users.updateOne(find, update)
      } catch (e) {
        throw new Error("user cannot be updated")
      }
    },
    deleteUser: async (params) => {
      try {
        const conn = await DatabaseConfig.mongoDbConnect("alo_tracker")
        const users = conn.model("user", UserSchema)
        return await users.deleteOne(params)
      } catch (e) {
        throw new Error("user cannot be deleted")
      }
    }
  }
})();

module.exports = UserRepository 