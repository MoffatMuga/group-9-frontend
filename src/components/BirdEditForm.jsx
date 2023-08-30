import React, { useState, useEffect } from 'react';

function BirdEditForm({ bird, onUpdate, onCancel }) {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');

  useEffect(() => {
    setName(bird.name);
    setSpecies(bird.species);
  }, [bird]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && species) {
      const updatedBird = { id: bird.id, name, species };
      try {
        const response = await fetch('https://rails-deployment.onrender.com/birds/' + bird.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedBird),
        });

        if (response.ok) {
          onUpdate(updatedBird); 
        } else {
          console.error('Failed to update bird.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Bird name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Species"
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
      />
      <button type="submit">Update Bird</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default BirdEditForm;
