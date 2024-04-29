import '../App.css';
import Header from "../components/Header/header";
import Carouselpage from '../components/carousel/carousel';
import Search from '../components/Search/SearchContainer';

export default function Homepage() {
    return (
        <div className="App">
            <Header />
            <Search/>
            <Carouselpage />
            <div>
            	<a href='/UltimateTicTacToe'>Ultimate Tic-Tac-Toe</a>
            </div>
            <div>
            	<a href='/MineSweeper'>MineSweeper</a>
            </div>
            
      </div>
    );
  };
