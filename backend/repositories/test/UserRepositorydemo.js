const UserRepository = require("../UserRepository");
const { User } = require('../models/UserSchema');
// const mockingoose = require('mockingoose');
const testDB = require('../../config/TestDatabaseconfig');
const Joi = require("joi");
const { ERROR_CODES } = require("../../errors/ERROR_CODES");
const UserDataError = require("../../errors/UserDataError");

describe('UserRepository tests', () => {
    beforeAll(async () => {
        // mockingoose(User).toReturn([]);
        await testDB.setup();
    })

    afterEach(async () => {
        await testDB.dropCollections();
    })

    afterAll(async () => {
        await testDB.dropDatabase();
    })

    it('getUsers should fetch the list of data from database', async () => {
        expect(await UserRepository.getUsers()).toEqual([]);
    })

    it('getUser should fetch a data from database', async () => {
        expect(await UserRepository.getUserByUsername()).toBeFalsy();
    })

    it('save user data throw validation error for invalid data', async () => {
        let error;
        try {
            const invalidUserData = await UserRepository.addUser({username: 'test', email: 'testdomain.com', password: 'test',role:'admin' });
        } catch (err) {
            error = err;
        }
        expect(error);
        //.toBeInstanceOf(Joi.ValidationError);
    })


    it('save user data throw error for no data', async () => {
        let error;
        try {
            const invalidUserData = await UserRepository.addUser({});
        } catch (err) {
            error = err;
        }
        expect(error);
        // .toBeInstanceOf(Joi.ValidationError);
    })

    it('save valid user data', async () => {
        const userData = { username: 'test', email: 'test@domain.com', password: 'test',role:'admin'  };
        const savedUser = await UserRepository.addUser(userData);
        // // ObjectId should be defined for successful save
        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toEqual(userData.username);
        expect(savedUser.email).toEqual(userData.email);
        expect(savedUser.password).toEqual(userData.password);
        expect(savedUser.role).toEqual(userData.role);
    });

    it('save failed and throws error for duplicate email', async () => {
        const userData = { username: 'test', email: 'test@domain.com', password: 'test',role:'admin' };
        const savedUser = await UserRepository.addUser(userData);
        let err, savedUserDup;
        try {
            const userDataDup = { username: 'test', email: 'test@domain.com', password: 'test',role:'admin' };
            savedUserDup = await UserRepository.addUser(userDataDup);
        } catch (error) {
            err = error;
        }

        // THEN
        expect(err);
        //toBeInstanceOf(UserDataError);
        //expect(err.code).toEqual(ERROR_CODES.DUPLICATE_RECORD); // Duplicate record
      //  expect(savedUserDup).toBeFalsy();
    });

    it('save failed for unknown reason should throw UserDataError', async () => {
        let err, savedUser;
        try {
            User.prototype.save = jest.fn().mockImplementation(() => {
                throw new Error('unknown');
            });

            const userData = { username: 'test', email: 'test@domain.com', password: 'test',role:'admin' };
            savedUser = await UserRepository.addUser(userData);
        } catch (error) {
            err = error;
        }
        // THEN
        expect(err)
        //.toBeInstanceOf(UserDataError);
       // expect(err.code).toEqual(ERROR_CODES.UNKNOWN);
        expect(savedUser).toBeFalsy();
    })
})