import React from 'react';
import { shallow } from 'enzyme';
import { Results } from '../Results';
import { searchContext } from '../../../consts/searchContext';

describe('Results', () => {
  const defaultProps = {
      searchParams: {
        ...searchContext
      }
    },
    generateProps = newProps => ({
      searchParams: {
        ...searchContext,
        ...newProps
      }
    });
  test('Renders', () => {
    const component = shallow(<Results {...defaultProps} />);

    expect(component).toMatchSnapshot();
  });

  test('shows cards container', () => {
    const props = generateProps({ loading: false });
    const component = shallow(<Results {...props} />);

    expect(component).toMatchSnapshot();
    expect(component.find('.c-results__container')).toHaveLength(1);
  });
});
