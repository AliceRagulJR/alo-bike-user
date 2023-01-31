const { UserSchema, validate } = require("../models/UserSchema");
const DatabaseConfig = require("../../config/DbConnection");
const UserRepository = require('../UserRepository');
const testDB = require('../../config/TestDatabaseConfig');
const mongoose = require('mongoose');

describe("user Repository testing", () => {

  beforeAll(async () => {
    // mockingoose(User).toReturn([]);
    await testDB.setup();
  })
  afterEach(async () => {
    mongoose.disconnect();
    await testDB.dropCollections();
  })

  it("get users", async () => {
    const res = await UserRepository.getUsers();

    expect(res).toBeTruthy();
  })

  it("get users by params", async () => {
    const params = { username: "wasim Akram" }
    const res = await UserRepository.getUserByUsername(params);

    expect(res).toBeTruthy();
  })
  
  it("add users", async () => {
    const params = {
      username: "alobin",
      password: "1223",
      email: "alobi@gmail.com",
      role: "admin",
    }
    const res = await UserRepository.addUser(params);

    expect(res).toBeTruthy();
  })

  it("Edit users by params", async () => {
    const params = { username: "wasim Akram", username: "wasim Akram" }
    const res = await UserRepository.edituser(params);

    expect(res).toBeTruthy();
  })

  it("delete users by params", async () => {
    const params = { username: "alobin" }
    const res = await UserRepository.deleteUser(params);

    expect(res).toBeTruthy();
  })

})