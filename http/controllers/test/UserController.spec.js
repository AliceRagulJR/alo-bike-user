const UserService = require("../../../services/UserService");
const bcrypt = require("bcrypt");
const JwtAuth = require("../../middleware/AllowRoute");
const testDB = require('../../../config/TestDatabaseConfig');
const mongoose = require('mongoose');

describe("user service", () => {

  beforeAll(async () => {
    await testDB.setup();
  })
  afterEach(async () => {
    mongoose.disconnect();
    await testDB.dropCollections();
  })


  it("GET user servieces", async () => {
    const res = await UserService.getUsers();
    expect(res).not.toBe([]);
  })
})