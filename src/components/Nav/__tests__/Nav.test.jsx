import React from 'react';
import { shallow } from 'enzyme';
import { Nav } from 'components/Nav/Nav';

describe('Nav', () => {
  let component, props;

  beforeEach(() => {
    props = {
      resetSearchTerm: jest.fn()
    };
    component = shallow(<Nav {...props} />);
  });

  test('Renders', () => {
    expect(component).toMatchSnapshot();
  });

  test('function is called', () => {
    component.find('.c-nav__links').simulate('click');
    expect(props.resetSearchTerm).toHaveBeenCalled();
  });
});
