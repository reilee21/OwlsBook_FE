import { baseApi } from './../_baseApi';

const AuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/Auth/Login',
                method: 'POST',
                body: credentials,
            }),
        }),
        logout:builder.mutation({            
            query:({uid})=>({
                url: `/Auth/Logout`,
                method:'POST',
                body:{uid}
            })
        })
    })
});

export const { useLoginMutation,useLogoutMutation } = AuthApi;
