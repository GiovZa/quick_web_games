import '../App.css';
import Header from "../components/Header/header";
import HangMan from '../components/Games/HangMan/HangMan';

export default function HangManPage() {
    return (
        <div className="Game">
            <Header/>
            <HangMan/>
        </div>
    );
  };