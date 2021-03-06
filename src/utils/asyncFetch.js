// @flow

import { BASE_URL, KEY } from 'consts/envVars';

type ParamProps = {
  [key: string]: string
};

export const asyncFetch = async (endpoint: string, params: ParamProps) => {
  let searchParams = '';

  if (params) {
    searchParams = '&';
    searchParams += Object.keys(params)
      .map(key => [key, params[key]].map(encodeURIComponent).join('='))
      .join('&');
  }

  const url = `${BASE_URL}/${endpoint}?api_key=${KEY}${searchParams}`,
    options = {
      method: 'GET',
      'Content-Type': 'application/json',
      dataType: 'jsonp'
    };
  try {
    const response = await fetch(url, options);

    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};
