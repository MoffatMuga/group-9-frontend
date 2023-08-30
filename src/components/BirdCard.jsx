import React from 'react';

const birdCardStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  margin: '10px',
  backgroundColor: '#f9f9f9',
};

const buttonStyle = {
  margin: '0 5px',
  padding: '5px 10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

function BirdCard({ bird, onDelete, onEdit }) {
  return (
    <div style={birdCardStyle}>
      <h3>{bird.name}</h3>
      <p>Species: {bird.species}</p>
      <button style={buttonStyle} onClick={() => onEdit(bird)}>
        Edit
      </button>
      <button style={buttonStyle} onClick={() => onDelete(bird.id)}>
        Delete
      </button>
    </div>
  );
}

export default BirdCard;
