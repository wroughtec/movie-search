// @flow

import React from 'react';
import { Consumer } from 'components/SearchContext/SearchContext';
import { GenreTags } from 'components/GenreTags/GenreTags';

type Props = {
  genreIds: number[]
};

export const GenreTagsWrapper = ({ genreIds }: Props) => (
  <Consumer>{({ genres }) => <GenreTags genres={genres} genreIds={genreIds} />}</Consumer>
);
