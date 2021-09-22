// import dotenv from 'dotenv';
// // import app from '../app'

// dotenv.config();

// const PORT = process.env.TEST_PORT
// const MONGO_URI = process.env.TEST_MONGO_URI

import { expect } from 'chai'
import { agent as request } from 'supertest'
import app from '../app'

describe("Index Test", () => {
    it('should always pass', () => {
        expect(true).to.equal(true);
    });
    it('should connect to the server', async () => {
        const res = await request(app).get('/');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.key('message');
    });
    it('should ping the client server', async () => {
        const res = await request(app).get('/api/v1/providers/ping');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.key('message');
    });
    it('should ping the provider server', async () => {
        const res = await request(app).get('/api/v1/clients/ping');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.key('message');
    });
});

describe("Route tests", () => {
    it('should get clients', async () => {
        const res = await request(app).get('/api/v1/clients/all').send({ client: 'first client' });
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.clients).to.be.an('array');
    });
    it('should get providers', async () => {
        const res = await request(app).get('/api/v1/providers/all').send({ provider: 'first provider' });
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.providers).to.be.an('array');
    });
})