import request from 'supertest';
import { app } from '../../app';

const apiUri = '/api/users/currentUser';

it('responds with details about the current user', async () => {
    const cookie = await global.signIn();

    const response = await request(app)
        .get(apiUri)
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual('test1@test.com')
});

it('responds with null if not authenticated', async () => {

    const response = await request(app)
        .get(apiUri)
        .send()
        .expect(200);

    expect(response.body.currentUser).toEqual(null);
});