import React, { useState, useMemo } from 'react';
import Search from '../Search/SearchContainer'; // Ensure path is correct
import GamesGrid from './GamesGrid';
import gamesData from './games';

const GamesContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('alphabetical');
  const [typeFilter, setTypeFilter] = useState(''); // Added for game type filtering

  const filteredAndSortedGames = useMemo(() => {
    const filteredGames = gamesData.filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (typeFilter === '' || game.types.includes(typeFilter))
    );

    return filteredGames.sort((a, b) => {
      if (sortOrder === 'alphabetical') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'reverseAlphabetical') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  }, [searchTerm, sortOrder, typeFilter, gamesData]); // Include typeFilter in dependency array

  return (
    <div>
      <Search
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSortChange={setSortOrder}
        onTypeFilter={setTypeFilter} // Pass setTypeFilter to Search
      />
      <GamesGrid games={filteredAndSortedGames} />
    </div>
  );
};

export default GamesContainer;
