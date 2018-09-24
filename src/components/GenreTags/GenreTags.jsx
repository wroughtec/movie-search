// @flow
import React from 'react';
import './_c-genre-tags.scss';

type Props = {
  genreIds: number[],
  genres: GenresType[]
};

export const GenreTags = ({ genreIds, genres }: Props) => {
  const tags = [];

  let genreTags = 'No genres';

  if (genres && genres.length && genreIds && genreIds.length) {
    genreIds.forEach(genreId => tags.push(...genres.filter(obj => obj.id === genreId)));

    genreTags = tags.map(tag => {
      const { id, name } = tag;
      return (
        <span key={id} className={`c-genre-tags__tag c-genre-tags__tag--${id}`}>
          {name}
        </span>
      );
    });
  }

  return <div className="c-genre-tags">{genreTags}</div>;
};
