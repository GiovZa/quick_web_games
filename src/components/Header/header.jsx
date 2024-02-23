import './styles.scss';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="Header">
      <h1>QuickWebGames</h1>
      <nav>
        <button>
          <Link to="/Gallery">Gallery</Link>
        </button>
        <button>
          <Link to="/list">List View</Link>
        </button>
      </nav>
    </header>
  );
};

export default Header;