import request from 'supertest';
import { app } from '../../app';

const apiUri = '/api/users/signUp'

it('returns a 201 on successful singUp', async () => {
    return request(app)
        .post(apiUri)
        .send({
            "email": "test1@test.com",
            "password": "11233445"
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post(apiUri)
        .send({
            "email": "test1",
            "password": "11233445"
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post(apiUri)
        .send({
            "email": "test1",
            "password": "11"
        })
        .expect(400);
});

it('returns a 400 with missing email and  password', async () => {
    await request(app)
        .post(apiUri)
        .send({ "email": "test1@test.com" })
        .expect(400);

    await request(app)
        .post(apiUri)
        .send({ "password": "11233445" })
        .expect(400);
});

it('disallows duplicate email', async () => {
    await request(app)
        .post(apiUri)
        .send({
            "email": "test1@test.com",
            "password": "11233445"
        })
        .expect(201);

    await request(app)
        .post(apiUri)
        .send({
            "email": "test1@test.com",
            "password": "11233445"
        })
        .expect(400);
});

it('it sets a cookie after successful singup', async () => {
    const response = await request(app)
        .post(apiUri)
        .send({
            "email": "test1@test.com",
            "password": "11233445"
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});