const axios = require('axios');
const debug = require('debug')('helpers:axios');
const createError = require('http-errors');

const PORT = process.env.PORT || 8080;
const BASE_URL = `http://localhost:${PORT}`;

module.exports = async ({ method = 'GET', url, data = {} }) => {
    try {
        url = `${BASE_URL}/${url}?access_token=${process.env.ACCESS_TOKEN}`;
        debug({ method, url, data });
        const response = await axios({ method, url, data });
        return response;
    } catch (error) {
        // https://github.com/axios/axios#handling-errors
        let err;
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            err = createError(error.response.status, error.response.data);
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            err = createError(500, `Request error: ${method} ${url}`);
        } else {
            // Something happened in setting up the request and triggered an Error
            err = createError(500, error.message);
        }
        throw err;
    }
}
