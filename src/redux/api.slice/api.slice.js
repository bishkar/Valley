import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const token = localStorage.getItem("accessToken")

export const imagesApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://images-api.nasa.gov/"
    baseUrl: "http://127.0.0.1:8000/api/v1/tags/",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }),
  endpoints: (builder) => ({
    search: builder.query({
      query: (searchValue) => ({
        url: `/${searchValue}`
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