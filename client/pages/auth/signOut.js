import { useEffect } from "react";
import Router from "next/router";
import userRequest from '../../hooks/userRequest'

const signOut = () => {
    let url = '/api/users/signOut';
    if (process.env.USE_LOCAL === 'true') {
        url = `http:localhost:3001${url}`;
    }

    const { doRequest, errors } = userRequest({
        url: url,
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
    });

    useEffect(() => {
        doRequest();
    }, []);

}

export default signOut;