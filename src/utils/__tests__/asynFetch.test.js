import fetchMock from 'fetch-mock';
import { asyncFetch } from '../asyncFetch';

fetchMock.get(`*`, JSON.stringify({ status: `Ok` }));

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
      await asyncFetch('test/endpoint');
    } catch (e) {
      expect(e).toMatch('error');
    }
  });
});
