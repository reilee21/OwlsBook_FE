import { baseApi } from './../_baseApi';

const AccountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
        getStaff: builder.query({
            query: () => ({
                url: '/Manage/Account/GetStaff',
                method: 'GET',
            }),
        }),
        getAccountProfile: builder.query({
            query: ({username}) => ({
                url: '/Manage/Account/GetAccountProfile?username=' + username,
                method: 'GET',
            }),
        }),
        updateRole: builder.mutation({
            query: (dtsm) => ({
                url: '/Manage/Account/UpdateRole',
                method: 'POST',
                body:dtsm
            }),
        }),
    })  
});

export const { useGetStaffQuery,useGetAccountProfileQuery,useUpdateRoleMutation } = AccountApi;
