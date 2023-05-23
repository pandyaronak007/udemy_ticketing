import mongoose from 'mongoose';
import { app } from './app'

const start = async () => {
    console.log('starting up........')
    try {
        const getEnvironment = process.env.NODE_ENV?.includes('localhost');
        if (getEnvironment) {
            // for local connection
            await mongoose.connect('mongodb://localhost:27017/auth')
        } else {
            if (!process.env.JWT_KEY) {
                throw new Error('JWT_KEY key must be defined')
            }
            if (!process.env.MONGO_URI) {
                throw new Error('MONGO_URI must be defined')
            }
            await mongoose.connect(process.env.MONGO_URI)
            // for inside docker name if we push code in docker
            // await mongoose.connect('mongodb://mongoLocal:27017/auth')
        }
        console.log('Connected to MongoDb')
    } catch (error) {
        console.error('error', error)
    }

    app.listen(3001, () => {
        console.log('Listening on 3001')
    })
}

start();

