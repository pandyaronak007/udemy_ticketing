import axios from "axios";

const buildClient = ({ req }) => {
    const setLocal = `http:localhost:3001`;
    if (typeof window === 'undefined') {
        // we are on the server
        const url = 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
        return axios.create({
            baseURL: process.env.USE_LOCAL === 'true' ? setLocal : url,
            headers: req.headers
        })
    } else {
        // we are on the browser
        return axios.create({
            baseURL: process.env.USE_LOCAL === 'true' ? setLocal : '/',
        })
    }
}

export default buildClient;