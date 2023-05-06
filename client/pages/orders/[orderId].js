import { useEffect, useState } from "react";
import Router from "next/router";
import StripeCheckout from 'react-stripe-checkout';
import userRequest from '../../hooks/userRequest';

const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState(0);

    const { doRequest, errors } = userRequest({
        url: '/api/payments',
        method: 'post',
        body: { orderId: order.id },
        onSuccess: (payment) => Router.push('/orders')
    });

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        }
        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId)
        };
    }, [order]);

    if (timeLeft < 0) {
        return (<div>
            order Expired
        </div>)
    }

    return (
        <div>
            Time left to pay: {timeLeft} seconds
            <StripeCheckout
                token={({ id }) => doRequest({ token: id })}
                stripeKey="pk_test_51N3KdJGcOAD6KTu5puvaqeQ8E5GA4VZMTrLLfw4mqCfHlNNajVYIZGf1B8Q3twOLP8XiLgTgKh0QL5Rmp34VH7le00X4iplLci"
                amount={order.ticket.price * 100}
                email={currentUser.email}
            />
            {errors}
        </div>
    )
}

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`)
    return { order: data };
}

export default OrderShow;