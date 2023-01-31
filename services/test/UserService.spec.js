const UserService = require('../UserService');
const mongoose = require('mongoose');

const testDB = require('../../config/TestDatabaseConfig');

describe("user service testing", () => {

  beforeAll(async () => {
    await testDB.setup();
  })
  afterEach(async () => {
    mongoose.disconnect();
    await testDB.dropCollections();
  })

  it("get users", async () => {
    const params = {username: 'test'}
    try{
     await UserService.getUserByUsername();
    }catch(e){
      expect(e).toHaveProperty("message","username is empty");
    }
  })

  it("add user", async() =>{
    const userData = {
           username: "test",
           email: "test@gmail.com", 
           password: "test", 
           role: "admin" 
          }
    const res = await UserService.addUser(userData);
    
    expect(res).toBeTruthy();
  })

  it("edit user", async () => {
    const params = {username: 'test', username:'test'}
    const res = await UserService.edituser();

    expect(res).toBeTruthy();
  })

  it("delete user", async () => {
    const params = {username: 'test'}
    const res = await UserService.deleteUser(params);

    expect(res).toBeTruthy();
  })
})