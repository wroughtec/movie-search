// @flow

import React from 'react';
import { shallow, mount } from 'enzyme';
import { GenreTags } from 'components/GenreTags/GenreTags';
import { GenreTagsWrapper } from 'components/GenreTags/GenreTagsWrapper';

describe('GenreTags', () => {
  let component, props;
  const genres: GenresType[] = [
    {
      id: 28,
      name: 'Action'
    },
    {
      id: 12,
      name: 'Adventure'
    },
    {
      id: 878,
      name: 'Science Fiction'
    }
  ];

  beforeEach(() => {
    props = {
      genreIds: [12, 28, 878],
      genres
    };

    component = shallow(<GenreTags {...props} />);
  });

  test('Renders', () => {
    expect(component).toMatchSnapshot();
  });

  test('no genres', () => {
    const newComponent = shallow(<GenreTags genreIds={props.genreIds} genres={[]} />);

    expect(newComponent).toMatchSnapshot();
  });

  // @TODO look into better ways of testing the new Context API seems Enzymes support in not yet complete
  test('wrapper renders', () => {
    const wrapper = shallow(<GenreTagsWrapper genreIds={props.genreIds} />, { context: { genres } });

    expect(wrapper).toMatchSnapshot();
  });
});
