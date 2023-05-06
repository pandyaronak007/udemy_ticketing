import request from 'supertest';
import { app } from '../../app';
const apiUrl = '/api/tickets';

const createTicket = () => {
    return request(app).post(apiUrl)
        .set('Cookie', global.signIn())
        .send({ title: 'title', price: 20 })
}

it('can fetch a list of tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app)
        .get(`${apiUrl}`)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(3);
})

