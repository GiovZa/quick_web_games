import '../App.css';
import GamesContainer from '../components/GamesGrid/GamesContainer';
import Header from "../components/Header/header";
import Search from '../components/Search/SearchContainer';


export default function SearchGamesPagese() {
    return (
      <div className="App">
        <Header />
        <GamesContainer/>
      </div>
    );
  };