import React from 'react';
import { shallow } from 'enzyme';
import { Card } from 'components/Card/Card';

describe('Card', () => {
  let component, props;

  beforeEach(() => {
    props = {
      title: 'Title',
      imageBaseUrl: 'imageBaseUrl',
      size: 'size',
      path: 'path',
      overview: 'overview',
      releaseDate: 'releaseDate'
    };
    component = shallow(<Card {...props} />);
  });
  test('Renders', () => {
    expect(component).toMatchSnapshot();
  });
});
