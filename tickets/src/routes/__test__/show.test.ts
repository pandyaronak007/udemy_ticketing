import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
const apiUrl = '/api/tickets';

it('return a 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app).get(`${apiUrl}/${id}`)
        .send().expect(404);
})

it('returns the ticket if the ticket is not found', async () => {
    const title = 'ticket12';
    const price = 20;

    const response = await request(app).post(apiUrl)
        .set('Cookie', global.signIn())
        .send({ title, price }).expect(201);

    const ticketResponse = await request(app)
        .get(`${apiUrl}/${response.body.id}`)
        .send()
        .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
})

