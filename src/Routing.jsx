import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/Welcomepage";
import Homepage from "./pages/Homepage";
import MineSweeper from "./components/Games/MineSweeper";
import UltimateTicTacToe from "./components/Games/UltimateTicTacToe";
import HangManPage from "./pages/HangManPage";
import SearchGamesPage from "./pages/Searchpage";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/MineSweeper" element={<MineSweeper />} />
      <Route path="/UltimateTicTacToe" element={<UltimateTicTacToe />} />
      <Route path="/HangMan" element={<HangManPage />} />
      <Route path="/searchgames" element={<SearchGamesPage />} />
    </Routes>
  );
}
