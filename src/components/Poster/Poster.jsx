// @flow
import React, { Component } from 'react';
import { produce } from 'immer';
import { Spinner } from 'components/Spinner/Spinner';

type Props = {
  imageBaseUrl: string,
  size: string,
  path: string,
  title: string
};

type State = {
  imgLoaded: boolean,
  imgError: boolean
};

export class Poster extends Component<Props, State> {
  state = { imgLoaded: false, imgError: false };

  handleImageError = () => {
    this.setState(
      produce(this.state, draft => {
        draft.imgError = true;
      })
    );
  };

  handleImageLoad = () => {
    this.setState(
      produce(this.state, draft => {
        draft.imgLoaded = true;
      })
    );
  };

  render() {
    const { imageBaseUrl, size, path, title } = this.props,
      { imgLoaded, imgError } = this.state;

    return (
      <div className="c-poster">
        {!imgLoaded && !imgError && path && <Spinner />}
        {!path && (
          // @TODO handle placeholder sizes and icons
          <div className="c-poster__no-img">
            <img
              className="c-poster__img"
              src="https://via.placeholder.com/300x444/6ea9c0/ffffff"
              alt="poster missing"
            />
          </div>
        )}
        {imgError &&
          path && (
            <div className="c-poster__error">
              <img
                className="c-poster__img"
                src="https://via.placeholder.com/300x444/e8117f/ffffff"
                alt="poster broken"
              />
            </div>
          )}
        {!imgError &&
          path && (
            <img
              onLoad={this.handleImageLoad}
              onError={this.handleImageError}
              className="c-poster__img"
              src={`${imageBaseUrl}${size}${path}`}
              alt={title}
            />
          )}
      </div>
    );
  }
}
