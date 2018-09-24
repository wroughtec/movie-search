import React from 'react';
import { shallow } from 'enzyme';
import { Results } from 'components/Results/Results';
import { searchContext } from 'consts/searchContext';
import { searchMock } from 'mocks/apiMocks';

describe('Results', () => {
  const defaultProps = {
      searchParams: {
        ...searchContext
      }
    },
    generateProps = ({ newProps, searchProps }) => ({
      searchParams: {
        ...searchContext,
        ...searchProps
      },
      ...newProps
    });
  test('Renders', () => {
    const component = shallow(<Results {...defaultProps} />);

    expect(component).toMatchSnapshot();
  });

  test('include search term', () => {
    const props = generateProps({
      newProps: { searchTerm: 'star wars' },
      searchProps: { loading: false, updateSearchTerms: jest.fn(), loadMovies: jest.fn() }
    });
    const component = shallow(<Results {...props} />);
    component.instance().componentDidMount();

    expect(component).toMatchSnapshot();
  });

  test('update searchTerms when searchTerm supplied', async () => {
    const updateSearchTerms = jest.fn(),
      loadMovies = jest.fn(),
      props = generateProps({
        newProps: { searchTerm: 'star wars' },
        searchProps: { updateSearchTerms, loadMovies }
      });

    const component = shallow(<Results {...props} />);

    await component.instance().componentDidMount();

    expect(updateSearchTerms).toHaveBeenCalled();
    expect(loadMovies).toHaveBeenCalled();
  });

  test('shows cards container', () => {
    const props = generateProps({ searchProps: { loading: false } });
    const component = shallow(<Results {...props} />);

    expect(component).toMatchSnapshot();
    expect(component.find('.c-results__container')).toHaveLength(1);
  });

  test('shows cards', () => {
    const props = generateProps({ searchProps: { loading: false, searchResults: searchMock } });
    const component = shallow(<Results {...props} />);

    expect(component).toMatchSnapshot();
  });
});
