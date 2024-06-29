import { GetData, PostData } from '../../utils';
import { Action } from './index';

export const allProducts = (data) => async (dispatch) => {
    try {
        const response = await PostData('/product/v1/spu/allproducts', data);

        return dispatch({ type: Action.ALL_PRODUCTS, payload: response.data });
    } catch (err) {
        console.log(err);
        // return err.response.data
    }
};
export const ProductsByfilter = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/product/v1/spu/getAllProductsByfilter',
            data
        );

        return dispatch({
            type: Action.PRODUCTS_FILTER,
            payload: response.data,
        });
    } catch (err) {
        console.log(err);
        // return err.response.data
    }
};
export const onProductDetail = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/product/v1/spu/findProductDetail',
            data
        );

        return dispatch({
            type: Action.PRODUCT_DETAIL,
            payload: response.data,
        });
    } catch (err) {
        console.log(err);
        // return err.response.data
    }
};
export const ProductsByCategory = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/product/v1/spu/findProductsByCategory',
            data
        );

        return dispatch({
            type: Action.PRODUCT_BY_CATEGORY,
            payload: response.data,
        });
    } catch (err) {
        console.log(err);
        // return err.response.data
    }
};
export const productById = (data) => async (dispatch) => {
    try {
        const response = await GetData('/product/v1/spu/getSpuById', {
            params: data,
        });

        return dispatch({
            type: Action.CURRENT_PRODUCT,
            payload: response.data,
        });
    } catch (err) {
        console.log(err);
    }
};
export const productFromCart = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/product/v1/spu/productFromCart',
            data
        );

        return dispatch({
            type: Action.PRODUCT_FROM_CART,
            payload: response.data,
        });
    } catch (err) {
        console.log(err);
        // return err.response.data
    }
};

export const listImageByProductId = (product_id) => async (dispatch) => {
    try {
        const response = await PostData(
            '/product/v1/gallery/ListImageByProductId',
            { product_id: product_id }
        );

        return dispatch({
            type: Action.LIST_PRODUCT_IMAGE,
            payload: response.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const findProductbestSelling = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/product/v1/spu/findProductBestSelling',
            data
        );

        return dispatch({
            type: Action.PRODUCT_BEST_SELLING,
            payload: response.data,
        });
    } catch (err) {
        console.log(err);
    }
};
