import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userapi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000/api", credentials: "include"}),
    tagTypes: ["User"],
    endpoints: (builder)=> ({

        getUser: builder.query({
            query: ()=> "/user",
            credentials: "include",
            providesTags: ["User"]
        }),

        updateUser: builder.mutation({
            query: ({id, body})=> ({
                url: `/update/${id}`,
                method: "PATCH",
                body: body
            }),
            credentials: "include",
            invalidatesTags: ["User"]
        }),

        createUser: builder.mutation({
            query: (body)=>({
                url:"/register",
                method: "POST",
                body: body
            })
            
        }),

        loginUser: builder.mutation({
            query: (body)=> ({
                url: "/login",
                method: "POST",
                body: body
            })
        })
    })
});

export const {useGetUserQuery, useCreateUserMutation, useUpdateUserMutation, useLoginUserMutation} = userApi

