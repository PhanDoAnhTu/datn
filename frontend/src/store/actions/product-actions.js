import { GetData, PostData } from '../../utils'
import { Action } from './index'


export const allProducts = ({ limit, page }) => async (dispatch) => {
  try {
    const response = await PostData('/product/v1/spu/allproducts', {
      limit, page
    });
    console.log('response:', response)
    return dispatch({ type: Action.ALL_PRODUCTS, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }
};

export const productById = ({ spu_id }) => async (dispatch) => {
  try {
    const response = await GetData('/product/v1/spu/getSpuById', {
      params: { spu_id: spu_id }
    });
    console.log('response:', response)
    return dispatch({ type: Action.CURRENT_PRODUCT, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};


export const listImageByProductId = (product_id) => async (dispatch) => {
  try {
    const response = await PostData('/product/v1/gallery/ListImageByProductId', { product_id: product_id });
    console.log('response:', response)
    return dispatch({ type: Action.LIST_PRODUCT_IMAGE, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }
};