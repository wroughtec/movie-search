import fetchMock from 'fetch-mock';
import requestMovies from '../requestMovies';
import { searchEndpoint, genresEndpoint, configEndpoint } from '../../consts/apiEndpoints';
import { BASE_URL, KEY } from '../../consts/envVars';

fetchMock.get(`${BASE_URL}${configEndpoint}?api_key=${KEY}`, JSON.stringify({ status: `Config` }));
fetchMock.get(`${BASE_URL}${genresEndpoint}?api_key=${KEY}`, JSON.stringify({ status: `Genres` }));
fetchMock.get(`${BASE_URL}${searchEndpoint}?api_key=${KEY}`, JSON.stringify({ status: `Search` }));

describe(`requestMovies`, () => {
  test(`config`, async () => {
    const responseJson = await requestMovies.config();
    expect(responseJson).not.toHaveProperty(`status`, `Search`);
    expect(responseJson).not.toHaveProperty(`status`, `Genres`);
    expect(responseJson).toHaveProperty(`status`, `Config`);
  });

  test(`getGenres`, async () => {
    const responseJson = await requestMovies.getGenres();
    expect(responseJson).not.toHaveProperty(`status`, `Config`);
    expect(responseJson).not.toHaveProperty(`status`, `Search`);
    expect(responseJson).toHaveProperty(`status`, `Genres`);
  });

  test(`searchMovies`, async () => {
    const responseJson = await requestMovies.searchMovies();
    expect(responseJson).not.toHaveProperty(`status`, `Config`);
    expect(responseJson).not.toHaveProperty(`status`, `Genres`);
    expect(responseJson).toHaveProperty(`status`, `Search`);
  });
});
