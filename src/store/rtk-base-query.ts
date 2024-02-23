import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {Alert} from 'react-native';

const baseQueryUnauthenticated = fetchBaseQuery({
  baseUrl: 'https://416c-186-132-17-191.ngrok-free.app/',
});

export const baseQueryWithAuthHandler: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryUnauthenticated(args, api, extraOptions);
  const apiData = result.data as {status: string; data: any};

  // sign user off if there is no access
  const statusCode = result.meta?.response?.status;
  const unauthorizedCodes = [403, 401];
  if (statusCode === 503) {
    Alert.alert(
      'We are doing changes!',
      'Dressy Club is under maintenance please try again later',
    );
  }
  if (statusCode && unauthorizedCodes.includes(statusCode)) {
    Alert.alert(
      'Please login again',
      'Hmm, it looks like you need to login again to continue using the app.',
      [
        {
          text: 'Ok',
          onPress: async () => {
          },
        },
      ],
    );
    return result;
  }

  if (apiData?.status === 'success') {
    return {
      data: apiData.data ?? null,
    };
  }

  return result;
};
