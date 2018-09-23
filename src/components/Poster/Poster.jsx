// @flow
import React, { Component } from 'react';
import { produce } from 'immer';
import { Spinner } from '../Spinner/Spinner';

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
        {!imgLoaded && !imgError && <Spinner />}
        {!imgError ? (
          <img
            onLoad={this.handleImageLoad}
            onError={this.handleImageError}
            className="c-poster__img"
            src={`${imageBaseUrl}${size}${path}`}
            alt={title}
          />
        ) : (
          <div className="c-poster__error">broken_image</div>
        )}
      </div>
    );
  }
}
