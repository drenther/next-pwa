import Link from 'next/link';

import '../spectre.css';
import '../style.css';

import OfflineSupport from '../components/OfflineSupport';

const Nav = () => (
  <header className="navbar">
    <section className="navbar-section">
      <Link prefetch href="/">
        <button className="btn btn-link text-bold">Home</button>
      </Link>
    </section>
    <OfflineSupport />
  </header>
);

export default Nav;
