import { expect } from 'chai'
import { agent as request } from 'supertest'
import app from '../app'
import Client from '../models/client'
import Provider from '../models/provider';

describe('Index Test', () => {
    it('should always pass', (done) => {
        expect(true).to.equal(true);
        done();
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
    it('should get all clients', async () => {
        const res = await request(app).get('/api/v1/clients/all');
        let clients:any = res.body.data.clients;
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.a.property('count').is.a('number');
        expect(res.body).to.have.a.property('message').equal('Clients successfully fetched');
        expect(clients).to.be.an('array');
        
        clients.forEach((client:any) => {
            expect(client.name).to.be.a('string');
            expect(client.email).to.be.a('string');
            expect(client.phone).to.be.a('number');
            expect(client.provider).to.be.an('array');
        });        
    });
    it('should get all providers', async () => {
        const res = await request(app).get('/api/v1/providers/all').send({ provider: 'first provider' });
        let providers:any = res.body.data.providers;
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.a.property('count').is.a('number');
        expect(res.body).to.have.a.property('message').equal('Providers successfully fetched');
        expect(providers).to.be.an('array');
        
        providers.forEach((provider: any) => {
            expect(provider.name).to.be.a('string');
        });        
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
        expect(res.body).to.have.a.property('message').equal('Client successfully created');
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
        expect(res.status).to.be.equal(400);
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
        expect(res.status).to.be.equal(400);
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
        expect(res.status).to.be.equal(400);
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
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not add data to the client data if phone number is less than 10', async () => {
        const res = await request(app)
            .post('/api/v1/clients/add')
            .send({
                name: 'Test1',
                email: 'test1@taest.test',
                phone: '136491527',
                provider: ['6146ff749250f63f63671622']
            });
        expect(res.status).to.be.equal(400);
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
        expect(res.status).to.be.equal(400);
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
        expect(res.status).to.be.equal(400);
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
        expect(res.status).to.be.equal(400);
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
        expect(res.body).to.have.a.property('message').equal('Provider successfully created');
        expect(res.body.provider).to.be.an('object');
    });
    it('should not add data to the provider data if name is missing', async () => {
        const res = await request(app)
            .post('/api/v1/providers/add')
            .send({});
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not add data to the provider data if name is less than 3 characters', async () => {
        const res = await request(app)
            .post('/api/v1/providers/add')
            .send({
                name: 'Te'
            });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
});

describe('Duplicate post route tests', () => {    
    it('should not add data to the client data if email is a duplicate', async () => {
        const res = await request(app)
            .post('/api/v1/clients/add')
            .send({
                name: 'Test1',
                email: 'test1@taast.test',
                phone: '13649152557',
                provider: ['6146ff749250f63f63671622']
            });
        expect(res.status).to.be.equal(409);
        expect(res.body).to.be.empty;
    });  
    it('should not add data to the provider data if name is a duplicate', async () => {
        const res = await request(app)
            .post('/api/v1/providers/add')
            .send({
                name: 'Test1'
            });
        expect(res.status).to.be.equal(409);
        expect(res.body).to.be.empty;
    });
});

describe('Get by id route tests', () => {
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
    it('should a client get by id', (done) => {
        let client = new Client({
            name: 'Test1',
            email: 'test1@taast.test',
            phone: '13649152557',
            provider: ['6146ff749250f63f63671622']
        });
        client.save((err, client) => {
            if (err) {
                done(err);
            }
            
            request(app)
                .get(`/api/v1/clients/${client._id}`)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.have.a.property('status').equal('success');
                    expect(res.body).to.have.a.property('message').equal('Client successfully fetched');
                    expect(res.body.data.client).to.be.an('object');
                    done();
                });
        });
    });
    it('should get by id providers', (done) => {
        let provider = new Provider({
            name: 'Test1'
        });
        provider.save((err, provider) => {
            if (err) {
                done(err);
            }
            request(app)
                .get(`/api/v1/providers/${provider._id}`)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.have.a.property('status').equal('success');
                    expect(res.body).to.have.a.property('message').equal('Provider successfully fetched');
                    expect(res.body.data.provider).to.be.an('object');
                    done();
                });
        });
    });
});

describe('Edit route tests', () => {
    beforeEach((done) => {
        Client.deleteMany({}, (err) => {
            done();
        });
    });
    before((done) => {
        Provider.deleteMany({}, (err) => {
            done();
        });
    });
    it('should edit a client by the given id', (done) => {
        let client = new Client({
            name: 'Test1',
            email: 'test1@tist.test',
            phone: '13649152557',
            provider: ['6146ff749250f63f63671622']
        });
        client.save((err, client) => {
            if (err) {
                done(err);
            }

            request(app)
                .put(`/api/v1/clients/edit/${client._id}`)
                .send({
                    name: 'Test2',
                    phone: '132397525537',
                    provider: [{ _id: '614e5aa5e3b97402ad30ed0c', name: 'Credit' }]
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body.updatedClient).to.be.an('object');
                    expect(res.body).to.have.a.property('message').equal('Client successfully updated');
                    done();
                });
        });
    });
    it('should not edit a client if provider is missing', (done) => {
        let client = new Client({
            name: 'Test1',
            email: 'test1@tist.test',
            phone: '13649152557',
            provider: ['6146ff749250f63f63671622']
        });
        client.save((err, client) => {
            if (err) {
                done(err);
            }

            request(app)
                .put(`/api/v1/clients/edit/${client._id}`)
                .send({
                    name: 'Test2',
                    phone: '132397525537'
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.be.empty;
                    done();
                });
        });
    });
    it('should edit a provider by the given id', (done) => {
        let provider = new Provider({
            name: 'Test1'
        });
        provider.save((err, provider) => {
            if (err) {
                done(err);
            }
            request(app)
                .put(`/api/v1/providers/edit/${provider._id}`)
                .send({ name: 'Test2' })
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body.updatedProvider).to.be.an('object');
                    expect(res.body).to.have.a.property('message').equal('Provider successfully updated');
                    done();
                });
        });
    });
    it('should not edit a provider if name is empty', (done) => {
        let provider = new Provider({
            name: 'Test3'
        });
        provider.save((err, provider) => {
            if (err) {
                done(err);
            }
            request(app)
                .put(`/api/v1/providers/edit/${provider._id}`)
                .send({ name: '' })
                .end((err, res) => {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.be.empty;
                    done();
                });
        });
    });
});

describe('Delete route tests', () => {
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
    it('should delete a client by the given id', (done) => {
        let client = new Client({
            name: 'Test1',
            email: 'test1@tist.test',
            phone: '13649152557',
            provider: ['6146ff749250f63f63671622']
        });
        client.save((err, client) => {
            if (err) {
                done(err);
            }

            request(app)
                .delete(`/api/v1/clients/delete/${client._id}`)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.have.a.property('message').equal('Client successfully deleted');
                    done();
                });
        });
    });
    it('should delete a provider by the given id', (done) => {
        let provider = new Provider({
            name: 'Test1'
        });
        provider.save((err, provider) => {
            if (err) {
                done(err);
            }
            request(app)
                .delete(`/api/v1/providers/delete/${provider._id}`)
                .send({ name: 'Test2' })
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.have.a.property('message').equal('Provider successfully deleted');
                    done();
                });
        });
    });
});