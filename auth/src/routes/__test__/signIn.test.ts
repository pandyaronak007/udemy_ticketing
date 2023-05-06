import request from 'supertest';
import { app } from '../../app';

const signInUri = '/api/users/signIn'
const signUpUri = '/api/users/signUp'

it('fails when a email does not exist is supplied', async () => {
    return request(app)
        .post(signInUri)
        .send({
            "email": "tes@test.com",
            "password": "112334456"
        })
        .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post(signUpUri)
        .send({
            "email": "test1@test.com",
            "password": "11233445"
        })
        .expect(201);

    await request(app)
        .post(signInUri)
        .send({
            "email": "test1@test.com",
            "password": "112334456"
        })
        .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
    await request(app)
        .post(signUpUri)
        .send({
            "email": "test1@test.com",
            "password": "11233445"
        })
        .expect(201);

    const response = await request(app)
        .post(signInUri)
        .send({
            "email": "test1@test.com",
            "password": "11233445"
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});