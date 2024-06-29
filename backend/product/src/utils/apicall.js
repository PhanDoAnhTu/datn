const axios = require('axios')

// api.defaults.baseURL = 'http://localhost:5000/api';
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 60000,
    headers: { 'X-Custom-Header': 'foobar' }
});

// const setHeader = async () => {
//     const tokens = JSON.parse(localStorage.getItem("tokens"))
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"))

//     if (tokens && userInfo) {
//         const CLIENT_ID = userInfo._id
//         api.defaults.headers.common['authorization'] = `${tokens.accessToken}`
//         api.defaults.headers.common['x-client-id'] = `${CLIENT_ID}`
//     }
// }

const GetData = async (endPoint, options) => {
    try {
        // setHeader();
        const response = await api.get(endPoint, options);
        return response;
    } catch (error) {
        console.error(error);
    }
};

const PostData = async (endPoint, options) => {
    try {
        // setHeader();
        const response = await api.post(endPoint, options);
        return response;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    PostData,
    GetData
}