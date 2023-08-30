import React from 'react';
import BirdCard from './BirdCard';

function BirdList({ birds, onDelete, onEdit }) {
  return (
    <div className="bird-list">
      {birds.map((bird) => (
        <BirdCard
          key={bird.id}
          bird={bird}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default BirdList;
