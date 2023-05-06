import { natsWrapper } from './natsWrapper';
import { OrderCreatedListener } from './events/listeners/orderCreateListener';

const start = async () => {
    try {
        const getEnvironment = process.env.NODE_ENV?.includes('localhost');
        if (getEnvironment) {
            // for local connection
            // await mongoose.connect('mongodb://localhost:27017/auth')
        } else {

            if (!process.env.NATS_CLIENT_ID) {
                throw new Error('NATS_CLIENT_ID must be defined')
            }
            if (!process.env.NATS_URL) {
                throw new Error('NATS_URL must be defined')
            }
            if (!process.env.NATS_CLUSTER_ID) {
                throw new Error('NATS_CLUSTER_ID must be defined')
            }
            await natsWrapper.connect(
                process.env.NATS_CLUSTER_ID,
                process.env.NATS_CLIENT_ID,
                process.env.NATS_URL
            );
            natsWrapper.client.on('close', () => {
                console.log('NATS connection closed!')
                process.exit();
            })

            process.on('SIGINT', () => natsWrapper.client.close());
            process.on('SIGTERM', () => natsWrapper.client.close());

            new OrderCreatedListener(natsWrapper.client).listen();

        }
        console.log('Connected to MongoDb')
    } catch (error) {
        console.error('error', error)
    }

}

start();

