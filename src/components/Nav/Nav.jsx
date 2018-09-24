import React from 'react';
import { Link } from '@reach/router';
import { home } from 'consts/routes';
import './_c-nav.scss';

export const Nav = ({ resetSearchTerm }) => {
  const handleNav = () => resetSearchTerm('');

  return (
    <div className="c-nav">
      <nav className="c-nav__container">
        <Link to={home} className="c-nav__links" onClick={handleNav}>
          Popular Movies
        </Link>
      </nav>
    </div>
  );
};
