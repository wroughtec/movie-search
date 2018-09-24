// @flow

import React from 'react';
import { Poster } from 'components/Poster/Poster';
import { trimString } from 'utils/trimString';
import { GenreTagsWrapper } from 'components/GenreTags/GenreTagsWrapper';
import { Link } from '@reach/router';
import { movie } from 'consts/routes';
import './_c-card.scss';

type Props = {
  title: string,
  imageBaseUrl: string,
  size: string,
  path: string,
  overview: string,
  releaseDate: string,
  genreIds: number[]
};

export const Card = ({ title, imageBaseUrl, size, path, overview, releaseDate, genreIds, id }: Props) => {
  const trimmedOverview = trimString(overview);
  return (
    <article className="c-card">
      <Link to={`${movie}${id}`}>
        <Poster imageBaseUrl={imageBaseUrl} size={size} path={path} title={title} />
      </Link>
      <div className="c-card__body">
        <header className="c-card__header">
          <Link to={`${movie}${id}`} className="c-card__link">
            <h2 className="c-card__title">{title}</h2>
          </Link>
          <small className="c-card__date">{releaseDate}</small>
        </header>
        <p className="c-card__overview">{trimmedOverview}</p>
        <GenreTagsWrapper genreIds={genreIds} />
      </div>
    </article>
  );
};
