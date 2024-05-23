import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/getSpuById`,
        params: { spu_id: productId }
      }),
      providesTags: ["Product"]
    }),
    allProducts: builder.query({
      query: ({ limit, page, sort = 'ctime', filter = { isPublished: true } }) => ({
        url: `${PRODUCT_URL}/AllProducts`,
        method: "POST",
        body: { limit, page, sort, filter }
      }),
      providesTags: ["Product"]
    }),
  }),

});

export const {
  useGetProductByIdQuery,
  useAllProductsQuery

} = productApiSlice;
