import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7148",
    prepareHeaders: (headers) => {
      const storedDate = sessionStorage.getItem("token");
      const parsedData = JSON.parse(storedDate);
      const token = parsedData.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ["Categories", "Transactions"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "/api/User",
        method: "POST",
        body: user,
        responseHandler: (response) => response.text(),
      }),
    }),
    getCategories: builder.query({
      query: (userId) => `/api/category/${userId}`,
      providesTags: ["Categories"],
    }),
    postCategory: builder.mutation({
      query: (Category) => ({
        url: "/api/Category",
        method: "POST",
        body: Category,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["Categories"],
    }),
    editCategory: builder.mutation({
      query: (UpdatedCategory) => ({
        url: "/api/Category/id",
        method: "PUT",
        body: UpdatedCategory,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["Categories", "Transactions"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/Category/${id.id}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["Categories", "Transactions"],
    }),
    getTransactions: builder.query({
      query: (userId) => `api/Transactions/${userId}`,
      providesTags: ["Transactions"],
    }),
    addTransaction: builder.mutation({
      query: (transaction) => ({
        url: "/api/Transactions/id",
        method: "POST",
        body: transaction,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["Transactions"],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/api/Transactions/${id}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["Transactions"],
    }),
    editTransaction: builder.mutation({
      query: (Transaction) => ({
        url: "/api/Transactions/id",
        method: "PUT",
        body: Transaction,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["Transactions"],
    }),
  }),
});
export const {
  useRegisterMutation,
  useGetCategoriesQuery,
  usePostCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useGetTransactionsQuery,
  useDeleteTransactionMutation,
  useEditTransactionMutation,
  useAddTransactionMutation,
} = apiSlice;
