import React from 'react';
import './gamesgrid-styles.scss';

const GamesGrid = ({ games }) => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '50px', padding: '30px' }}>
        {games.map(game => (
          <a href={`/${game.page}`} key={game.id} className="button-style">
            <div className="game-card">
              <img src={game.image} alt={game.name} style={{ width: 200, height: 200 }} />
              <h4>{game.name}</h4>
              <p>Type: {game.types.join(', ')}</p>
            </div>
          </a>
        ))}
      </div>
    );
  };

export default GamesGrid;
