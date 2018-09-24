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

export const movieDetails = {
  adult: false,
  backdrop_path: '/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg',
  belongs_to_collection: {
    id: 10,
    name: 'Star Wars Collection',
    poster_path: '/iTQHKziZy9pAAY4hHEDCGPaOvFC.jpg',
    backdrop_path: '/d8duYyyC9J5T825Hg7grmaabfxQ.jpg'
  },
  budget: 11000000,
  genres: [{ id: 12, name: 'Adventure' }, { id: 28, name: 'Action' }, { id: 878, name: 'Science Fiction' }],
  homepage: 'http://www.starwars.com/films/star-wars-episode-iv-a-new-hope',
  id: 11,
  imdb_id: 'tt0076759',
  original_language: 'en',
  original_title: 'Star Wars',
  overview:
    'Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.',
  popularity: 47.377,
  poster_path: '/btTdmkgIvOi0FFip1sPuZI2oQG6.jpg',
  production_companies: [
    { id: 1, logo_path: '/o86DbpburjxrqAzEDhXZcyE8pDb.png', name: 'Lucasfilm', origin_country: 'US' },
    { id: 25, logo_path: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png', name: '20th Century Fox', origin_country: 'US' }
  ],
  production_countries: [{ iso_3166_1: 'US', name: 'United States of America' }],
  release_date: '1977-05-25',
  revenue: 775398007,
  runtime: 121,
  spoken_languages: [{ iso_639_1: 'en', name: 'English' }],
  status: 'Released',
  tagline: 'A long time ago in a galaxy far, far away...',
  title: 'Star Wars',
  video: false,
  vote_average: 8.2,
  vote_count: 9718
};
