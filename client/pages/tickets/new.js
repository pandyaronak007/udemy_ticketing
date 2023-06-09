import { useState } from "react";
import Router from "next/router";
import userRequest from '../../hooks/userRequest';

const newTicket = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    let url = '/api/tickets';

    const { doRequest, errors } = userRequest({
        url: url,
        method: 'post',
        body: { title, price },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        await doRequest();
    }

    const onBlur = () => {
        const value = parseFloat(price);

        if (isNaN(value)) return;

        setPrice(value.toFixed(2));
    }

    return (
        <div>
            <h2>Create a ticket</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="form-control" />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        value={price}
                        onBlur={onBlur}
                        onChange={e => setPrice(e.target.value)}
                        className="form-control" />
                </div>
                {errors}
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default newTicket;