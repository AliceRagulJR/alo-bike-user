const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../../server');
const request = supertest(app)
const testDB = require('../../../config/TestDatabaseConfig');
const mongoose = require('mongoose');

describe('User Router', () => {

  beforeAll(async () => {
   
    await testDB.setup();
  })
  afterEach(async () => {
    mongoose.disconnect();
    await testDB.dropCollections();
  })
 

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQWxpY2UgUmFndWwiLCJlbWFpbCI6InJhZ3VsQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1OTYwODg1NCwiZXhwIjoxNjU5Njk1MjU0fQ.8tfpSjs6_RCudskfwcJUnQFh6j5YcDine_s1gpau6gw"

  it('isConnected', async () => {
    await request.get('/').expect(200);
  })


  it('POST user login', async () => {
    const res = await request.post('/api/users/login')
      .send({
        username: "janofar",
        password: "jahan"
      });

    expect(res.statusCode).toEqual(200);
  })

  it('GET all Users', async () => {
    const res = await request.get('/api/users');

    expect(res.statusCode).toEqual(200);
  })
})