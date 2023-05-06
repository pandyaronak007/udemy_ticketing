import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../natsWrapper';

const apiUrl = '/api/tickets';

it('has a route handler listing to /api/tickets for post request', async () => {
    const response = await request(app).post(apiUrl).send({});

    expect(response.status).not.toEqual(404);
})

it('can only be accessed if the user signed in', async () => {
    await request(app).post(apiUrl).send({}).expect(401);
})

it('returns status other then 401 if the user signed in', async () => {
    const response = await request(app)
        .post(apiUrl)
        .set('Cookie', global.signIn())
        .send({});

    expect(response.status).not.toEqual(401);
})

it('returns an error if an invalid title is provided', async () => {
    await request(app)
        .post(apiUrl)
        .set('Cookie', global.signIn())
        .send({
            title: '', price: 10
        }).expect(400);

    await request(app).post(apiUrl)
        .set('Cookie', global.signIn())
        .send({ price: 10 }).expect(400);
})

it('returns an error if an invalid price is provided', async () => {
    await request(app).post(apiUrl)
        .set('Cookie', global.signIn())
        .send({
            title: 'dadfdfad', price: -10
        }).expect(400);

    await request(app).post(apiUrl)
        .set('Cookie', global.signIn())
        .send({ title: 'dadfdfad' }).expect(400);
})

it('create a ticket with valid input', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = 'ticket12'

    await request(app).post(apiUrl)
        .set('Cookie', global.signIn())
        .send({ title, price: 20 }).expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
    expect(tickets[0].title).toEqual(title);
})

it('publishes as events', async () => {
    const title = 'ticket12'

    await request(app).post(apiUrl)
        .set('Cookie', global.signIn())
        .send({ title, price: 20 }).expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
})
