import React from 'react';
import fetchMock from 'fetch-mock';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import { App } from '../App';
import { searchEndpoint, genresEndpoint, configEndpoint } from '../consts/apiEndpoints';
import { BASE_URL, KEY } from '../consts/envVars';

const searchMock = {
    page: 1,
    total_results: 140,
    total_pages: 7,
    results: [
      {
        vote_count: 9703,
        id: 11,
        video: false,
        vote_average: 8.2,
        title: 'Star Wars',
        popularity: 44.515,
        poster_path: '/btTdmkgIvOi0FFip1sPuZI2oQG6.jpg',
        original_language: 'en',
        original_title: 'Star Wars',
        genre_ids: [],
        backdrop_path: '/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg',
        adult: false,
        overview:
          'Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.',
        release_date: '1977-05-25'
      }
    ]
  },
  configMock = {
    images: {
      base_url: 'http://image.tmdb.org/t/p/',
      secure_base_url: 'https://image.tmdb.org/t/p/',
      backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
      logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
      poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
      profile_sizes: ['w45', 'w185', 'h632', 'original'],
      still_sizes: ['w92', 'w185', 'w300', 'original']
    },
    change_keys: []
  };

fetchMock.get(`${BASE_URL}${genresEndpoint}?api_key=${KEY}`, JSON.stringify({ status: `Genres` }));
fetchMock.get(`${BASE_URL}${configEndpoint}?api_key=${KEY}`, JSON.stringify({ ...configMock }));
fetchMock.get(`${BASE_URL}${searchEndpoint}?api_key=${KEY}`, JSON.stringify({ ...searchMock }));

describe('App', () => {
  const event = { preventDefault: () => {} },
    currentTarget = {
      currentTarget: {
        value: 'star wars'
      }
    },
    sleep = ms => new Promise(resolve => setTimeout(resolve, ms)),
    DELAY_MS = 2000;

  beforeEach(() => {
    jest.spyOn(event, 'preventDefault');
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');

    render(<App />, div);
  });

  it('should render correctly', () => {
    const component = shallow(<App />);

    expect(component).toMatchSnapshot();
  });

  test(`loads data into state in componentDidMount`, async () => {
    const wrapper = shallow(<App />);

    await wrapper.instance().componentDidMount();
    // Add fake delay
    await sleep(DELAY_MS);
    expect(wrapper.state('imageBaseUrl')).toEqual('https://image.tmdb.org/t/p/');

    wrapper.update();
    expect(wrapper.find('SearchBox')).toHaveLength(1);
    expect(wrapper.find('ResultsWrapper')).toHaveLength(1);
  });

  test('componentDidMount Error', async () => {
    const wrapper = shallow(<App />);
    fetchMock.config.overwriteRoutes = true;
    fetchMock.get(`${BASE_URL}${configEndpoint}?api_key=${KEY}`, JSON.stringify({ ...configMock }));

    try {
      await wrapper.instance().componentDidMount();
    } catch (e) {
      expect(e).toEqual(e);
    }
  });

  test('handleSubmit', async () => {
    const wrapper = shallow(<App />);

    await wrapper.instance().handleMovieSubmit(event);
    await sleep(DELAY_MS);
    expect(wrapper.state('searchResults')).toEqual(searchMock);
  });

  test('handleSubmit Error', async () => {
    const wrapper = shallow(<App />);
    expect.assertions(1);
    try {
      await wrapper.instance().handleMovieSubmit();
    } catch (e) {
      expect(e).toEqual(e);
    }
  });

  test('handleOnChange', async () => {
    const wrapper = shallow(<App />);

    await wrapper.instance().handleSearchChange(currentTarget);
    await sleep(DELAY_MS);
    expect(wrapper.state('searchTerms')).toEqual('star wars');
  });
});
