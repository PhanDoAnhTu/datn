import { GetData, PostData } from "../../utils/apicall";
import { Action } from "./index";

export const allProducts = (data) => async (dispatch) => {
  try {
    const response = await PostData("/product/v1/spu/allproducts", data);

    return dispatch({ type: Action.ALL_PRODUCTS, payload: response.data });
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const onAllProductsOption = (data) => async (dispatch) => {
  try {
    const response = await PostData("/product/v1/spu/AllProductsOption", data);

    return dispatch({ type: Action.ALL_PRODUCTS, payload: response.data });
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

// export const productById = ({ spu_id }) => async (dispatch) => {
//   try {
//     const response = await GetData('/product/v1/spu/getSpuById', {
//       params: { spu_id: spu_id }
//     });
//     console.log('response:', response)
//     return dispatch({ type: Action.CURRENT_PRODUCT, payload: response.data });

//   } catch (err) {
//     console.log(err)
//     return err.response.data

//   }

// };

export const listImageByProductId = (product_id) => async (dispatch) => {
  try {
    const response = await PostData(
      "/product/v1/gallery/ListImageByProductId",
      { product_id: product_id }
    );

    return dispatch({
      type: Action.LIST_PRODUCT_IMAGE,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const createSpu = (data) => async (dispatch) => {
  try {
    const response = await PostData("/product/v1/spu/create", data);

    return dispatch({ type: Action.CREATE_PRODUCT, payload: response.data });
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const OneProductDetail = (data) => async (dispatch) => {
  try {
    const response = await PostData("/product/v1/spu/OneProductDetail", data);

    return dispatch({ type: Action.PRODUCT_DETAIL, payload: response.data });
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};
export const PublishProduct = (data) => async (dispatch) => {
  try {
    const response = await PostData("/product/v1/spu/PublishProduct", data);

    return dispatch({
      type: Action.CHANGE_STATE_PRODUCT,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const UnPublishProduct = (data) => async (dispatch) => {
  try {
    const response = await PostData("/product/v1/spu/UnPublishProduct", data);

    return dispatch({
      type: Action.CHANGE_STATE_PRODUCT,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const isTrashProduct = (data) => async (dispatch) => {
  try {
    const response = await PostData("/product/v1/spu/isTrashProduct", data);

    return dispatch({
      type: Action.CHANGE_STATE_PRODUCT,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};
