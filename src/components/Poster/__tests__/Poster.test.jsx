import React from 'react';
import { shallow } from 'enzyme';
import { Poster } from 'components/Poster/Poster';

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

  test('no path', () => {
    const newProps = {
        ...props,
        path: ''
      },
      newComponent = shallow(<Poster {...newProps} />);
    newComponent.instance().handleImageError();

    expect(newComponent).toMatchSnapshot();
  });

  test('handleImageError', () => {
    component.instance().handleImageError();

    expect(component.state('imgError')).toEqual(true);
  });

  test('handleImageLoad', () => {
    component.instance().handleImageLoad();

    expect(component.state('imgLoaded')).toEqual(true);
  });
});
