import React from 'react';
import { Poster } from '../Poster/Poster';
import './_c-card.scss';
import { trimString } from '../../utils/trimString';

export const Card = ({ title, imageBaseUrl, size, path, overview, releaseDate }) => {
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
      </div>
    </article>
  );
};
