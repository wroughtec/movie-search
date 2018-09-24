// @flow

import React from 'react';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import { Movie } from 'components/Movie/Movie';
import { BASE_URL, KEY } from 'consts/envVars';
import { movieDetails } from 'mocks/apiMocks';
import { MovieWrapper } from 'components/Movie/MovieWrapper';

fetchMock.get(`${BASE_URL}/movie/11?api_key=${KEY}`, JSON.stringify({ ...movieDetails }));

describe('Movie', () => {
  let component, props;

  beforeEach(() => {
    props = {
      movieId: '11',
      size: 'xl',
      imageBaseUrl: 'http://url.co/'
    };

    component = shallow(<Movie {...props} />);
  });

  test('Renders', () => {
    expect(component).toMatchSnapshot();
  });

  test('load data on componentDidMount', async () => {
    const getMovieDetails = jest.spyOn(component.instance(), 'getMovieDetails');
    await component.instance().componentDidMount();

    expect(getMovieDetails).toBeCalled();
  });

  test('no data componentDidMount', async () => {
    const newProps = { ...props, movieId: '' },
      newComponent = shallow(<Movie {...newProps} />);
    const getMovieDetails = jest.spyOn(newComponent.instance(), 'getMovieDetails');
    await component.instance().componentDidMount();

    expect(getMovieDetails).not.toBeCalled();
  });

  test('no data from api', async () => {
    fetchMock.config.overwriteRoutes = true;
    fetchMock.get(`${BASE_URL}/movie/11?api_key=${KEY}`, JSON.stringify({ error: 'error' }));
    const newComponent = shallow(<Movie {...props} />);

    expect(newComponent).toMatchSnapshot();
  });

  // @TODO look into better ways of testing the new Context API seems Enzymes support in not yet complete
  test('wrapper renders', () => {
    const wrapper = shallow(<MovieWrapper id="11" />, {
      context: {
        xl: 'xl',
        imageBaseUrl: 'http://url.co/'
      }
    });

    expect(wrapper).toMatchSnapshot();
  });
});
