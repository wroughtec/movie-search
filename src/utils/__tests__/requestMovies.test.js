import fetchMock from 'fetch-mock';
import requestMovies from '../requestMovies';
import { searchEndpoint, configEndpoint } from '../../consts/apiEndpoints';
import { BASE_URL, KEY } from '../../consts/envVars';

fetchMock.get(`${BASE_URL}${configEndpoint}?api_key=${KEY}`, JSON.stringify({ status: `Config` }));
fetchMock.get(`${BASE_URL}${searchEndpoint}?api_key=${KEY}`, JSON.stringify({ status: `Search` }));

describe(`requestMovies`, () => {
  test(`config`, async () => {
    const responseJson = await requestMovies.config(configEndpoint);
    expect(responseJson).not.toHaveProperty(`status`, `Search`);
    expect(responseJson).toHaveProperty(`status`, `Config`);
  });

  test(`searchMovies`, async () => {
    const responseJson = await requestMovies.searchMovies(searchEndpoint);
    expect(responseJson).not.toHaveProperty(`status`, `Config`);
    expect(responseJson).toHaveProperty(`status`, `Search`);
  });
});
