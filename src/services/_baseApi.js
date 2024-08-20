import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const owlsUrl = 'https://localhost:7000/api/';

const baseQuery = fetchBaseQuery({
  baseUrl: owlsUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.atk || localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');


    if (refreshToken) {
      const refreshResult = await baseQuery({
        url: '/Auth/RefreshToken',
        method: 'POST',
        body: {accessToken, refreshToken },
      }, api, extraOptions);

      if (refreshResult) {
        api.dispatch(setTokens({
          accessToken: refreshResult.accessToken,
          refreshToken: refreshResult.refreshToken,
        }));

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(clearTokens());
        
      }
    } else {
      api.dispatch(clearTokens());
    }
  }

  return result;
};
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});


