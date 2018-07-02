import Link from 'next/link';

import '../spectre.css';

const Nav = () => (
  <header className="navbar">
    <section className="navbar-section">
      <Link prefetch href="/">
        <button className="btn btn-link">Home</button>
      </Link>
    </section>
  </header>
);

export default Nav;
