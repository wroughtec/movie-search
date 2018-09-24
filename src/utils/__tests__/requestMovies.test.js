import fetchMock from 'fetch-mock';
import requestMovies from 'utils/requestMovies';
import { searchEndpoint, genresEndpoint, configEndpoint, popularEndpoint } from 'consts/apiEndpoints';
import { BASE_URL, KEY } from 'consts/envVars';

fetchMock.get(`${BASE_URL}/${configEndpoint}?api_key=${KEY}`, JSON.stringify({ status: `Config` }));
fetchMock.get(`${BASE_URL}/${genresEndpoint}?api_key=${KEY}`, JSON.stringify({ status: `Genres` }));
fetchMock.get(`${BASE_URL}/${searchEndpoint}?api_key=${KEY}`, JSON.stringify({ status: `Search` }));
fetchMock.get(`${BASE_URL}/${popularEndpoint}?api_key=${KEY}`, JSON.stringify({ status: `Popular` }));
fetchMock.get(`${BASE_URL}/movie/11?api_key=${KEY}`, JSON.stringify({ status: `Details` }));

describe(`requestMovies`, () => {
  test(`config`, async () => {
    const responseJson = await requestMovies.config();
    expect(responseJson).not.toHaveProperty(`status`, `Search`);
    expect(responseJson).not.toHaveProperty(`status`, `Genres`);
    expect(responseJson).not.toHaveProperty(`status`, `Popular`);
    expect(responseJson).toHaveProperty(`status`, `Config`);
  });

  test(`getGenres`, async () => {
    const responseJson = await requestMovies.getGenres();
    expect(responseJson).not.toHaveProperty(`status`, `Config`);
    expect(responseJson).not.toHaveProperty(`status`, `Search`);
    expect(responseJson).not.toHaveProperty(`status`, `Popular`);
    expect(responseJson).not.toHaveProperty(`status`, `Details`);
    expect(responseJson).toHaveProperty(`status`, `Genres`);
  });

  test(`searchMovies`, async () => {
    const responseJson = await requestMovies.searchMovies('test');
    expect(responseJson).not.toHaveProperty(`status`, `Config`);
    expect(responseJson).not.toHaveProperty(`status`, `Genres`);
    expect(responseJson).not.toHaveProperty(`status`, `Popular`);
    expect(responseJson).not.toHaveProperty(`status`, `Details`);
    expect(responseJson).toHaveProperty(`status`, `Search`);
  });

  test(`searchMovies with page`, async () => {
    const responseJson = await requestMovies.searchMovies('test', 2);

    expect(responseJson).toHaveProperty(`status`, `Search`);
  });

  test(`popularMovies`, async () => {
    const responseJson = await requestMovies.popularMovies();
    expect(responseJson).not.toHaveProperty(`status`, `Config`);
    expect(responseJson).not.toHaveProperty(`status`, `Genres`);
    expect(responseJson).not.toHaveProperty(`status`, `Search`);
    expect(responseJson).not.toHaveProperty(`status`, `Details`);
    expect(responseJson).toHaveProperty(`status`, `Popular`);
  });

  test(`movieDetails`, async () => {
    const responseJson = await requestMovies.movieDetails('11');
    expect(responseJson).not.toHaveProperty(`status`, `Config`);
    expect(responseJson).not.toHaveProperty(`status`, `Genres`);
    expect(responseJson).not.toHaveProperty(`status`, `Search`);
    expect(responseJson).not.toHaveProperty(`status`, `Popular`);
    expect(responseJson).toHaveProperty(`status`, `Details`);
  });
});
