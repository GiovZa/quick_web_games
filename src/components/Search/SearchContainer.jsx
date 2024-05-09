import { Component } from 'react';
import PropTypes from "prop-types";
import './search-styles.scss';

const Search = ({ searchTerm, onSearchTermChange, onSortChange, onTypeFilter }) => {

  // PropTypes in React ensure that components use correct data types and pass the right data as props from one component to another.
  Search.propTypes = {
    // string that represents the current input string the user has entered.
    // This is required for the searchbar to function
    searchTerm: PropTypes.string.isRequired,

    // function called to filter games corresponsind to searchTerm
    onSearchTermChange: PropTypes.func.isRequired,
    
    // function called to filter games in different orders when they are displayed.
    onSortChange: PropTypes.func.isRequired,

    // THESE BUTTON FILTERS WILL PROBABLY BE OPTIONAL BECAUSE OF THE FEW GAMES WE HAVE
    // function called when a game-type filter button is click. The function will filter the display items by the selected type.
    onTypeFilter: PropTypes.func.isRequired,
  };

  return (
    <div className="Search">
      <input
        className="Search-input"
        type="text"
        placeholder="Search Games ..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />
      <div className="Search-controls">
        <select onChange={(e) => onSortChange(e.target.value)}>
          <option value="alphabetical">A-Z</option>
          <option value="reverseAlphabetical">Z-A</option>
        </select>
        <button  onClick={() => onTypeFilter('')}>All Types </button>
        <button  onClick={() => onTypeFilter('Classic')}>Classic</button>
        <button  onClick={() => onTypeFilter('Puzzle')}>Puzzle</button>
        <button  onClick={() => onTypeFilter('Strategy')}>Strategy</button>
        <button  onClick={() => onTypeFilter('Single Player')}>Single Player</button>
        <button  onClick={() => onTypeFilter('Two Player')}>Two Player</button>
        <button  onClick={() => onTypeFilter('Board')}>Board</button>
      </div>
    </div>
  );
};

export default Search;
