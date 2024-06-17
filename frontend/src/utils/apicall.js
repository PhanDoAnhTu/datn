import api from 'axios';

api.defaults.baseURL = 'http://localhost:5000/api';

const setHeader = async () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"))
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if (tokens & userInfo) {
        const CLIENT_ID = userInfo._id
        api.defaults.headers.common['authorization'] = `${tokens.accessToken}`
        api.defaults.headers.common['x-client-id'] = `${CLIENT_ID}`
    }
}

export const GetData = async (endPoint, options) => {
    try {
        setHeader();
        const response = await api.get(endPoint, options);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const PostData = async (endPoint, options) => {
    try {
        setHeader();
        const response = await api.post(endPoint, options);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const PutData = async (endPoint, options) => {
    try {
        setHeader();
        const response = await api.put(endPoint, options);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const DeleteData = async (endPoint, options) => {
    try {
        setHeader();
        const response = await api.delete(endPoint, options);
        return response;
    } catch (error) {
        console.error(error);
    }
};
