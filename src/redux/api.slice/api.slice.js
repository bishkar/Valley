import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const imagesApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://images-api.nasa.gov/"
  }),
  endpoints: (builder) => ({
    search: builder.query({
      query: (searchValue) => ({
        url: `/search?q=${searchValue}&media_type=image`
      })
    }),
    getImage: builder.query({
      query: (nasa_id) => ({
        url: `/asset/${nasa_id}`
      })
    }),
    getImageData: builder.query({
      query: (nasa_id) => ({
        url: `search?nasa_id=${nasa_id}`
      })
    })
  })
})


export const {
  useSearchQuery,
  useGetImageQuery,
  useGetImageDataQuery
} = imagesApi;