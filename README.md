# movie-search
Search for movies in react from the [MovieDb](https://www.themoviedb.org/)

## Requirements
For development, you will only need Node.js installed on your environement. Only visually tested on latest version of Chrome and Firefox

### Yarn
Recommended to use [Yarn](https://yarnpkg.com/en/docs/install#mac-stable) rather than npm as all instructions will be written with yarn.

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure below.

    $ node --version
    v8.11.3

    $ npm --version
    5.60

---
## Install

    $ git clone git@github.com:wroughtec/movie-search.git
    $ cd movie-search
    $ yarn

### Configure

An `.env` is committed into the repo this contains the API url and API key (this is bad practise but for this excerise will make life easier)

## Run locally

    $ yarn dev

This will run a server on `localhost:1234` and create a folder called `dist` in the root of the repo (it is ignored). Any changes you make the files will be rebuilt

## Build for production

@TODO

## Tests

To run the tests

    $ yarn test

---
## TODOS
- Add postCss tools to help deal with older browsers
- Add search by genre
- Colour code each genre
- Refactor GenreTags so can be more reusable to handle the different data structures from the different endpoints
- Clean up styling so pages actually look good
- Add header and footer
- Add pagination to search results
- Add typeahead to search rather than on submit
---

## Languages & tools


### JavaScript

- [Eslint](https://eslint.org/) used to help prevent JavaScript errors.
- [Parcel](https://parceljs.org/) to handle the bundling and running of the server
- [Prettier](https://github.com/prettier/prettier) keeps our code correctl formatted.
- [React](https://reactjs.org/) library used to build the UI
- [ReachRouter](https://reach.tech/router) the library used for routing
- [React currency formatter](https://www.npmjs.com/package/react-currency-formatter) used to format currency
- [immer](https://github.com/mweststrate/immer) used to help mange react local state

### CSS
  - [Stylelint](https://github.com/stylelint/stylelint) is used to prevent CSS errors
