import Link from 'next/link';

import '../spectre.css';
import '../style.css';

const Nav = () => (
  <header className="navbar">
    <section className="navbar-section">
      <Link prefetch href="/">
        <button className="btn btn-link text-bold">Home</button>
      </Link>
    </section>
  </header>
);

export default Nav;
