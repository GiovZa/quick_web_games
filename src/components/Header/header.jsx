import './styles.scss';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="Header">
      <h1>
        <button>
          <Link to="/homepage" className = "a">QuickWebGames</Link>
        </button>
      </h1>
      
      <nav>
      <Link to="/homepage" className="button-style">Home</Link>
      <Link to="/searchgames" className="button-style">Search Games</Link>
      </nav>
    </header>
  );
};

export default Header;