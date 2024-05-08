import '../App.css';
import Header from "../components/Header/header";
import Carouselpage from '../components/carousel/carousel';
import Search from '../components/Search/SearchContainer';
import "../components/Games/UltimateTicTacToe.scss";

export default function Homepage() {
    return (
        <div className="App">
            <Header />
            <Search/>
            <Carouselpage />
            <div>
                  <a href='/MineSweeper'> 
                    <button className="reset-button" style={{backgroundColor: "#30208c"}}>MineSweeper</button>
                  </a>
                    <button className="reset-button-space">{' '}</button>
                  <a href='/UltimateTicTacToe'>
                    <button className="reset-button" style={{backgroundColor: "#30208c"}}>Ultimate Tic Tac Toe</button>
                  </a>
            </div>
            
      </div>
    );
  };
