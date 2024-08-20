import { baseApi } from './../_baseApi';

const ProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: '/Customer/GetProfile',
                method: 'GET',
            }),
        }),
        updateProfile:builder.mutation({            
            query:(profile)=>({
                url: `/Customer/UpdateProfile`,
                method:'PUT',
                body:profile
            })
        })
    })  
});

export const { useGetProfileQuery,useUpdateProfileMutation } = ProfileApi;
