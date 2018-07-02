import React from 'react';

import Head from './Head';
import Nav from './Nav';

const Header = props => (
  <div className="header">
    <Head title="Movies" />
    <Nav />
  </div>
);

export default Header;
