import fetchMock from 'fetch-mock';
import { BASE_URL, KEY } from 'consts/envVars';
import { asyncFetch } from 'utils/asyncFetch';

fetchMock.get(`${BASE_URL}/test/endpoint?api_key=${KEY}`, JSON.stringify({ status: `Ok` }));

describe(`Mocking fetch`, () => {
  test(`fails with synchronous code`, () => {
    const responseJson = asyncFetch('test/endpoint');
    expect(responseJson).not.toHaveProperty(`status`, `Ok`);
  });

  test(`using promises`, () => {
    expect.assertions(1);
    return asyncFetch(`test/endpoint`).then(responseJson => {
      expect(responseJson).toHaveProperty(`status`, `Ok`);
    });
  });

  test(`using async/await`, async () => {
    const responseJson = await asyncFetch('test/endpoint');
    expect(responseJson).toHaveProperty(`status`, `Ok`);
  });

  test(`with params`, async () => {
    const responseJson = await asyncFetch('test/endpoint', { test: 'test' });
    expect(responseJson).toHaveProperty(`status`, `Ok`);
  });

  test('the fetch fails with an error', async () => {
    try {
      await asyncFetch('test/error');
    } catch (e) {
      expect(e).toBe(e);
    }
  });
});
