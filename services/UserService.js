const UserRepository = require("../repositories/UserRepository");
const axios = require("axios");
const { ERROR_CODES } = require("../errors/ERROR_CODES");

const UserService = (() => {
  return {
    getUsers: async () => {
      return UserRepository.getUsers();
    },
    getUserByUsername: (phoneNumber) => {
      if(!phoneNumber){
         throw new Error("username is empty")
      }
      return UserRepository.getUserByUsername(phoneNumber)
    },
    addUser: async (data) => {
      return await UserRepository.addUser(data)
    },
    findUser: async (phoneNumber) => {
      if (!phoneNumber) {
        throw new Error("user not found")
      }
      return UserRepository.findUser(phoneNumber)
    },
    // bikeDetails: async (data) => {
    //   return await UserRepository.bikeDetails(data)
    // },
    edituser: async (find, update) => {
      return await UserRepository.edituser(find, update);
    },
    deleteUser : async (data) => {
      return await UserRepository.deleteUser(data)
    }
  };
})();

module.exports = UserService;
