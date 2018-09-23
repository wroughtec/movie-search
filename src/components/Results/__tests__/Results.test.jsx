import React from 'react';
import { shallow } from 'enzyme';
import { Results } from '../Results';

describe('Results', () => {
  const defaultProps = {
    searchParams: {
      loading: true,
      config: {},
      searchTerms: '',
      searchResults: {},
      handleMovieSearch() {}
    }
  };
  test('Renders', () => {
    const component = shallow(<Results {...defaultProps} />);

    expect(component).toMatchSnapshot();
  });
});
