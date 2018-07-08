import React, { Component } from 'react';
import Router from 'next/router';

import Head from './Head';
import Nav from './Nav';

class Header extends Component {
  state = { loading: false };

  componentDidMount() {
    Router.onRouteChangeStart = () => {
      this.setState({ loading: true });
    };
    Router.onRouteChangeComplete = () => {
      this.setState({ loading: false });
    };
    Router.onRouteChangeError = () => {
      this.setState({ loading: false });
    };
  }

  render() {
    return (
      <div className="header">
        <Loader loading={this.state.loading} />
        <Head title="Movies" />
        <Nav />
      </div>
    );
  }
}

const Loader = ({ loading }) => <div className={loading ? 'loading-show' : ''} id="loader-bar" />;

export default Header;
