import React from 'react';
import { shallow } from 'enzyme';
import { Poster } from '../Poster';

describe('Poster', () => {
  let component, props;

  beforeEach(() => {
    props = {
      title: 'Title',
      imageBaseUrl: 'imageBaseUrl',
      size: 'size',
      path: 'path'
    };
    component = shallow(<Poster {...props} />);
  });
  test('Renders', () => {
    expect(component).toMatchSnapshot();
  });
});
