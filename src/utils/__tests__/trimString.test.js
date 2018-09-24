import { trimString } from '../trimString';

describe(`trimString`, () => {
  test(`trims string and adds ...`, () => {
    const str = trimString('my string', 3);
    expect(str).toHaveLength(5);
    expect(str).toEqual('my...');
  });

  test(`does not add ...`, () => {
    const str = trimString('my string');
    expect(str).toHaveLength(9);
    expect(str).toEqual('my string');
  });
});
