import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../natsWrapper';
import { Ticket } from '../../models/ticket';

const apiUrl = '/api/tickets';

it('return a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signIn())
        .send({
            title: 'aslkdfj',
            price: 20,
        })
        .expect(404);
})

it('return a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`${apiUrl}/${id}`)
        .send({
            title: '', price: 20
        })
        .expect(401);
})

it('return a 401 if the user does not own the tickets', async () => {
    const response = await request(app)
        .post(apiUrl)
        .set('Cookie', global.signIn())
        .send({
            title: 'testing1', price: 20
        })

    await request(app)
        .put(`${apiUrl}/${response.body.id}`)
        .set('Cookie', global.signIn())
        .send({
            title: 'testing2', price: 100
        })
        .expect(401);

})

it('return a 400 if the user provided an invalid title or price', async () => {
    const cookie = global.signIn();
    const response = await request(app)
        .post(apiUrl)
        .set('Cookie', cookie)
        .send({
            title: 'testing3', price: 20
        });

    await request(app)
        .put(`${apiUrl}/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '', price: 100
        })
        .expect(400);

    await request(app)
        .put(`${apiUrl}/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'dfsdfad', price: -10
        })
        .expect(400);

})

it('updates the ticket provided valid inputs', async () => {
    const cookie = global.signIn();
    const response = await request(app)
        .post(apiUrl)
        .set('Cookie', cookie)
        .send({
            title: 'testing3', price: 20
        });

    await request(app)
        .put(`${apiUrl}/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'testing4', price: 100
        })
        .expect(200);

    const ticketResponse = await request(app)
        .get(`${apiUrl}/${response.body.id}`)
        .send()

    console.log('ticketResponse', ticketResponse.body);

    expect(ticketResponse.body.title).toEqual('testing4');
    expect(ticketResponse.body.price).toEqual(100);
})

it('publishes as events', async () => {
    const cookie = global.signIn();
    const response = await request(app)
        .post(apiUrl)
        .set('Cookie', cookie)
        .send({
            title: 'testing3', price: 20
        });

    await request(app)
        .put(`${apiUrl}/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'testing4', price: 100
        })
        .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('rejects updates if the ticket is reserved', async () => {
    const cookie = global.signIn();
    const response = await request(app)
        .post(apiUrl)
        .set('Cookie', cookie)
        .send({
            title: 'testing3', price: 20
        });

    const ticket = await Ticket.findById(response.body.id);
    ticket.set({ orderId: new mongoose.Types.ObjectId().toHexString() })
    await ticket.save();

    await request(app)
        .put(`${apiUrl}/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'testing4', price: 100
        })
        .expect(400);

});