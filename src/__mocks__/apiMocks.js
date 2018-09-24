export const searchMock = {
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
};

export const configMock = {
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

export const genresMock = [{ id: 1, name: 'new' }];
