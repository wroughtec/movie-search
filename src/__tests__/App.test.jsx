import React from 'react';
import fetchMock from 'fetch-mock';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import { App } from 'app/App';
import { searchEndpoint, genresEndpoint, configEndpoint, popularEndpoint } from 'consts/apiEndpoints';
import { BASE_URL, KEY } from 'consts/envVars';
import { searchMock, configMock, genresMock } from 'mocks/apiMocks';

describe('App', () => {
  fetchMock.get(`${BASE_URL}/${genresEndpoint}?api_key=${KEY}`, JSON.stringify({ genres: genresMock }));
  fetchMock.get(`${BASE_URL}/${configEndpoint}?api_key=${KEY}`, JSON.stringify({ ...configMock }));
  fetchMock.get(`${BASE_URL}/${searchEndpoint}?api_key=${KEY}`, JSON.stringify({ ...searchMock }));
  fetchMock.get(`${BASE_URL}/${popularEndpoint}?api_key=${KEY}`, JSON.stringify({ ...searchMock }));
  fetchMock.get('*', JSON.stringify({ error: 'error' }));

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
    expect(wrapper.state('genres')).toEqual(genresMock);
    expect(wrapper.state('popularResults')).toEqual(searchMock);

    wrapper.update();
    expect(wrapper.find('SearchBox')).toHaveLength(1);
    expect(wrapper.find('ResultsWrapper')).toHaveLength(2);
  });

  test('handleSubmit', async () => {
    const wrapper = shallow(<App />);

    await wrapper.instance().handleMovieSubmit(event);
    await sleep(DELAY_MS);
    expect(wrapper.state('searchResults')).toEqual(searchMock);
  });

  test('handleOnChange', async () => {
    const wrapper = shallow(<App />);

    await wrapper.instance().handleSearchChange(currentTarget);
    await sleep(DELAY_MS);
    expect(wrapper.state('searchTerms')).toEqual('star wars');
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

  test('componentDidMount endpoints no data', async () => {
    fetchMock.config.overwriteRoutes = true;
    fetchMock.get(`${BASE_URL}/${configEndpoint}?api_key=${KEY}`, JSON.stringify({ error: 'error' }));
    fetchMock.get(`${BASE_URL}/${genresEndpoint}?api_key=${KEY}`, JSON.stringify({ error: 'error' }));
    fetchMock.get(`${BASE_URL}/${popularEndpoint}?api_key=${KEY}`, JSON.stringify({ error: 'error' }));
    const wrapper = shallow(<App />);
    await wrapper.instance().componentDidMount();
    // Add fake delay
    await sleep(DELAY_MS);

    expect(wrapper.state('imageBaseUrl')).toEqual('');
    expect(wrapper.state('genres')).toEqual([]);
    expect(wrapper.state('popularResults')).toEqual({});
  });
});
