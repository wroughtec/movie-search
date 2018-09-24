// @flow

import React, { Component } from 'react';
import RequestMovies from 'utils/requestMovies';
import { produce } from 'immer';
import { Spinner } from 'components/Spinner/Spinner';
import { Poster } from 'components/Poster/Poster';
import { Link } from '@reach/router';
import Currency from 'react-currency-formatter';
import './_c-movie.scss';

type Props = {
  movieId: string,
  size: string,
  imageBaseUrl: string
};

type State = {
  loading: boolean,
  movieDetails: any
};

export class Movie extends Component<Props, State> {
  state = {
    loading: true,
    movieDetails: {}
  };

  componentDidMount() {
    const { movieId } = this.props;

    if (movieId) {
      this.getMovieDetails(movieId);
    }
  }

  getMovieDetails = async (id: string) => {
    const movie = await RequestMovies.movieDetails(id);

    if (movie && movie.id) {
      this.setState(
        produce(this.state, draft => {
          draft.movieDetails = movie;
          draft.loading = false;
        })
      );
    }
  };

  movieDetails = () => {
    const {
        movieDetails: {
          title,
          backdrop_path: path,
          overview,
          homepage,
          tagline,
          runtime,
          revenue,
          release_date: releaseDate,
          vote_average: rating,
          genres,
          production_companies: companies
        }
      } = this.state,
      { imageBaseUrl, size } = this.props;

    return (
      <article className="c-movie__details">
        <Poster imageBaseUrl={imageBaseUrl} size={size} path={path} title={title} />
        <div className="c-movie__container">
          <header className="c-movie__header">
            <h1 className="c-movie__title">
              {!homepage && title}
              {homepage && (
                <Link className="c-movie__link" to={homepage} target="_blank">
                  {title}
                </Link>
              )}
            </h1>
            {tagline && <h2 className="c-movie__tagline">{tagline}</h2>}
            {companies &&
              companies.length > 0 && (
                <div className="c-genre-tags">
                  {companies.map(company => {
                    const { id, name } = company;

                    return (
                      <span key={id} className={`c-genre-tags__tag c-genre-tags__tag--${id}`}>
                        {name}
                      </span>
                    );
                  })}
                </div>
              )}
          </header>
          <div className="c-movie__content">
            <div className="c-movie__description">
              <p className="c-movie__body">{overview}</p>
              {genres &&
                genres.length > 0 && (
                  <div className="c-genre-tags">
                    {genres.map(genre => {
                      // @TODO refactor to use the GenreTags componet
                      const { id, name } = genre;

                      return (
                        <span key={id} className={`c-genre-tags__tag c-genre-tags__tag--${id}`}>
                          {name}
                        </span>
                      );
                    })}
                  </div>
                )}
            </div>
            <div className="c-movie__meta">
              {releaseDate && (
                <div className="c-movie__group">
                  <h4 className="c-movie__heading">Release</h4>
                  <span className="c-movie__detail">{releaseDate}</span>
                </div>
              )}
              {runtime && (
                <div className="c-movie__group">
                  <h4 className="c-movie__heading">Length</h4>
                  <span className="c-movie__detail">{runtime} mins</span>
                </div>
              )}
              {revenue && (
                <div className="c-movie__group">
                  <h4 className="c-movie__heading">Box office</h4>
                  <span className="c-movie__detail">
                    <Currency quantity={revenue} currency="USD" />
                  </span>
                </div>
              )}
              {rating && (
                <div className="c-movie__group">
                  <h4 className="c-movie__heading">Rating</h4>
                  <span className="c-movie__detail">
                    {rating}
                    /10
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <section className="c-movie">
        {loading && <Spinner />}
        {!loading && this.movieDetails()}
      </section>
    );
  }
}
