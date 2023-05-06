import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
    var signIn: (id?: string) => string[];
}

jest.mock('../natsWrapper');

process.env.STRIPE_KEY = 'sk_test_51N3KdJGcOAD6KTu5WDyOorKBB0CwckNwEIqclYAZrvRKHgaZ5DEVEO042WPavo4fPcWbA3q5b0kSdN9ntXv05IKt008lj1kVmW'

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'asdf';

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
})

beforeEach(async () => {
    jest.clearAllMocks();

    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany();
    }
})

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});

global.signIn = (id?: string) => {
    // build a JWT payload. { id, email }
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com',
    };

    // create the JWT!
    const token = jwt.sign(payload, process.env.JWT_KEY!)

    // build session object. { jwt: MY_JWT }
    const session = { jwt: token };

    // turn that session to JSON
    const sessionJSON = JSON.stringify(session);

    // take JSON and encode it base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string that the cookie with encoded data
    return [`session=${base64}`];
}