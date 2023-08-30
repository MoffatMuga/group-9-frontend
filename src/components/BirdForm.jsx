import React, { useState } from 'react';

function BirdForm({ onAdd }) {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && species) {
      const newBird = { name, species };
      try {
        const response = await fetch('https://rails-deployment.onrender.com/birds', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBird),
        });

        if (response.ok) {
          const data = await response.json();
          onAdd(data); 
          setName('');
          setSpecies('');
        } else {
          console.error('Failed to add bird.');
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
      <button type="submit">Add Bird</button>
    </form>
  );
}

export default BirdForm;
