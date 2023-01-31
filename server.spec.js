const supertest = require('supertest');
const app = require('./server');
const request = supertest(app);

describe('Server test', () => {
    it('GET /', async () => {
        // GIVEN: Call / API
        const res = await request.get('/');
        // THEN
        expect(res.status).toBe(200);
        expect(res.headers['x-powered-by']).toBeTruthy();
        expect(res.body.message).toBe('ok');
    })


})