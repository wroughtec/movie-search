// @flow
import React, { Component, Fragment } from 'react';
import { produce } from 'immer';
import RequestMovies from './utils/requestMovies';
import { Spinner } from './components/Spinner/Spinner';
import './_app.scss';

type State = {
  loading: boolean,
  config: any
};
export class App extends Component<void, State> {
  state = {
    loading: true,
    config: {}
  };

  async componentDidMount() {
    this.addConfigToState();
  }

  addConfigToState = async () => {
    const config = await RequestMovies.config();

    this.setState(
      produce(this.state, draft => {
        draft.config = config;
        draft.loading = false;
      })
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <Fragment>
        {loading && <Spinner />}
        {!loading && <div>Rendered</div>}
      </Fragment>
    );
  }
}
