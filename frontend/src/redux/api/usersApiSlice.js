import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        headers:{
          authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiNjY0MDlhMWFkMmY1M2IwM2EwOTQ4OWZhIiwiY3VzdG9tZXJfZW1haWwiOiJwaGFuZG9hbmh0dTEyOEBnbWFpbC5jb20iLCJpYXQiOjE3MTU2MTkxMDUsImV4cCI6MTcxNTc5MTkwNX0.xK8Itx6RtSoVaPxGig_kK7oP5DG44olhcPu0GxklXVk",
          'x-client-id':"66409a1ad2f53b03a09489fa"
        }
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useUpdateUserMutation,
} = userApiSlice;
