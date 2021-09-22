import { expect } from 'chai'
import { agent as request } from 'supertest'
import app from '../app'
import Client from '../models/client'
import Provider from '../models/provider';

describe('Index Test', () => {
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

describe('Get all route tests', () => {
    it('should get clients', async () => {
        const res = await request(app).get('/api/v1/clients/all');
        let clients:any = res.body.data.clients;
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.an('object');
        expect(clients).to.be.an('array');
        
        clients.forEach((client:any) => {
            expect(client.name).to.be.a('string');
            expect(client.email).to.be.a('string');
            expect(client.phone).to.be.a('number');
            expect(client.provider).to.be.an('array');
        })
        
    });
    it('should get providers', async () => {
        const res = await request(app).get('/api/v1/providers/all').send({ provider: 'first provider' });
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.providers).to.be.an('array');
    });
});

describe('Post route tests', () => {
    before((done) => {        
        Client.deleteMany({}, (err) => {
            done();
        });
    });
    before((done) => {
        Provider.deleteMany({}, (err) => {
            done();
        });
    });
    it('should add data to the client data', async () =>{
        const res = await request(app)
            .post('/api/v1/clients/add')
            .send({
                name: 'Test1',
                email: 'test1@taast.test',
                phone: '13649152557',
                provider: ['6146ff749250f63f63671622']
            });
        expect(res.status).to.be.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body.client).to.be.an('object');
    });
    it('should not add data to the client data if name is missing', async () => {
        const res = await request(app)
            .post('/api/v1/clients/add')
            .send({
                email: 'test1@taast.test',
                phone: '13649152557',
                provider: ['6146ff749250f63f63671622']
            });
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.empty;
    });
    it('should not add data to the client data if email is missing', async () => {
        const res = await request(app)
            .post('/api/v1/clients/add')
            .send({
                name: 'Test1',
                phone: '13649152557',
                provider: ['6146ff749250f63f63671622']
            });
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.empty;
    });
    it('should not add data to the client data if phone is missing', async () => {
        const res = await request(app)
            .post('/api/v1/clients/add')
            .send({
                name: 'Test1',
                email: 'test1@taast.test',
                provider: ['6146ff749250f63f63671622']
            });
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.empty;
    });
    it('should not add data to the client data if provider id is missing', async () => {
        const res = await request(app)
            .post('/api/v1/clients/add')
            .send({
                name: 'Test1',
                email: 'test1@taast.test',
                phone: '13649152557'
            });
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.empty;
    });
    it('should not add data to the client data if phone number is less than 10', async () => {
        const res = await request(app)
            .post('/api/v1/clients/add')
            .send({
                name: 'Test1',
                email: 'test1@taast.test',
                phone: '136491527',
                provider: ['6146ff749250f63f63671622']
            });
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.empty;
    });
    it('should not add data to the client data if email format is wrong', async () => {
        const res = await request(app)
            .post('/api/v1/clients/add')
            .send({
                name: 'Test1',
                email: 'test1aast.test',
                phone: '136491523567',
                provider: ['6146ff749250f63f63671622']
            });
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.empty;
    });
    it('should not add data to the client data if name is less than 3 characters', async () => {
        const res = await request(app)
            .post('/api/v1/clients/add')
            .send({
                name: 'Te',
                email: 'test1aast.test',
                phone: '136491523567',
                provider: ['6146ff749250f63f63671622']
            });
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.empty;
    });
    it('should not add data to the client data if provider id is less than 24 characters', async () => {
        const res = await request(app)
            .post('/api/v1/clients/add')
            .send({
                name: 'Test1',
                email: 'test1aast.test',
                phone: '136491523567',
                provider: ['6146ff7492503f63671622']
            });
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.empty;
    });
    it('should add data to the provider data', async () => {
        const res = await request(app)
            .post('/api/v1/providers/add')
            .send({
                name: 'Test1'
            });
        expect(res.status).to.be.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body.provider).to.be.an('object');
    });
    it('should not add data to the provider data if name is missing', async () => {
        const res = await request(app)
            .post('/api/v1/providers/add')
            .send({});
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.empty;
    });
    it('should not add data to the provider data if name is less than 3 characters', async () => {
        const res = await request(app)
            .post('/api/v1/providers/add')
            .send({
                name: 'Te'
            });
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.empty;
    });
});