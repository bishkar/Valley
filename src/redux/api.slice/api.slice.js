import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const imagesApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://images-api.nasa.gov/"
    baseUrl: 'http://127.0.0.1:8000/api/v1/articles/'
  }),
  endpoints: (builder) => ({
    search: builder.query({
      query: (searchValue) => ({
        url: `/?search=${searchValue}`
      })
    }),
    // getImage: builder.query({
    //   query: (nasa_id) => ({
    //     url: `/asset/${nasa_id}`
    //   })
    // }),
    // getImageData: builder.query({
    //   query: (nasa_id) => ({
    //     url: `search?nasa_id=${nasa_id}`
    //   })
    // })
  })
})


export const {
  useSearchQuery,
  useGetImageQuery,
  useGetImageDataQuery
} = imagesApi;