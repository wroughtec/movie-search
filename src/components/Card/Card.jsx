// @flow

import React from 'react';
import { Poster } from 'components/Poster/Poster';
import { trimString } from 'utils/trimString';
import { GenreTagsWrapper } from 'components/GenreTags/GenreTagsWrapper';
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

export const Card = ({ title, imageBaseUrl, size, path, overview, releaseDate, genreIds }: Props) => {
  const trimmedOverview = trimString(overview);
  return (
    <article className="c-card">
      <Poster imageBaseUrl={imageBaseUrl} size={size} path={path} title={title} />
      <div className="c-card__body">
        <header className="c-card__header">
          <h2 className="c-card__title">{title}</h2>
          <small className="c-card__date">{releaseDate}</small>
        </header>
        <p className="c-card__overview">{trimmedOverview}</p>
        <GenreTagsWrapper genreIds={genreIds} />
      </div>
    </article>
  );
};
