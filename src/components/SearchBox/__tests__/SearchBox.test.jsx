import React from 'react';
import { shallow } from 'enzyme';
import { SearchBox } from 'components/SearchBox/SearchBox';

describe('SearchBox', () => {
  test('Renders', () => {
    const component = shallow(<SearchBox />);

    expect(component).toMatchSnapshot();
  });
});
