import React, { Component, Fragment } from 'react';
import { Spinner } from '../Spinner/Spinner';
import { Card } from '../Card/Card';

export class Results extends Component {
  displayCards = () => {
    const { searchParams } = this.props,
      { searchResults, config } = searchParams;

    let cards = null,
      size = null,
      imageBaseUrl = null;

    if (config && config.images) {
      imageBaseUrl = config.images.secure_base_url;
      [size] = config.images.still_sizes;
    }

    if (searchResults && searchResults.results) {
      if (searchResults.results.length) {
        cards = searchResults.results.map(card => {
          const { title, id, release_date: releaseDate, poster_path: posterPath, overview } = card;
          return (
            <Card
              key={id}
              title={title}
              releaseDate={releaseDate}
              overview={overview}
              path={posterPath}
              imageBaseUrl={imageBaseUrl}
              size={size}
            />
          );
        });
      }
    }

    return cards;
  };

  render() {
    const { searchParams } = this.props,
      { loading } = searchParams,
      cards = this.displayCards();

    return (
      <Fragment>
        {loading && <Spinner />}
        {!loading && cards}
      </Fragment>
    );
  }
}
