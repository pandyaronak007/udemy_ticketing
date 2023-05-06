import request from 'supertest';
import { app } from '../../app';

const apiUri = '/api/users/signOut';
const signUpUri = '/api/users/signUp';

it('clears the cookie after singing out', async () => {
    await request(app)
        .post(signUpUri)
        .send({
            "email": "test1@test.com",
            "password": "11233445"
        })
        .expect(201);

    const response = await request(app)
        .post(apiUri)
        .send({})
        .expect(200);

    expect(response.get('Set-Cookie')[0]).toEqual(
        'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    )
});