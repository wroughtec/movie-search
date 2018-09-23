import React from 'react';
import { Poster } from '../Poster/Poster';

export const Card = ({ title, imageBaseUrl, size, path, overview, releaseDate }) => {
  return (
    <div>
      <Poster imageBaseUrl={imageBaseUrl} size={size} path={path} title={title} />
      <h2>
        {title}
        <small>{releaseDate}</small>
      </h2>
      <p>{overview}</p>
    </div>
  );
};
