import Router from "next/router";
import userRequest from '../../hooks/userRequest';

const OrderIndex = ({ orders }) => {

    // const { doRequest, errors } = userRequest({
    //     url: '/api/orders',
    //     method: 'post',
    //     body: { ticketId: ticket.id },
    //     onSuccess: (order) =>
    //         Router.push('/orders/[orderId]', `/orders/${order.id}`)
    // });

    return (
        <ul>
            {orders.map(order => {
                return <li key={order.id}>
                    {order.ticket.title} - {order.status}
                </li>
            })}
        </ul>
    )
}

OrderIndex.getInitialProps = async (context, client) => {
    const { data } = await client.get(`/api/orders`)
    return { orders: data };
}

export default OrderIndex;