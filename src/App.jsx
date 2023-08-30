import React, { useState, useEffect } from 'react';
import './App.css';
import BirdList from './components/BirdList';
import BirdForm from './components/BirdForm';
import BirdEditForm from './components/BirdEditForm';

const API_URL = 'https://rails-deployment.onrender.com/birds'; 

function App() {
  const [birds, setBirds] = useState([]);
  const [editingBird, setEditingBird] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setBirds(data))
      .catch((error) => console.error('Error fetching birds:', error));
  }, []);

  const handleAddBird = (newBird) => {
    setBirds([...birds, newBird]); 
  };

  const handleUpdateBird = (updatedBird) => {
    const updatedBirds = birds.map((bird) =>
      bird.id === updatedBird.id ? updatedBird : bird
    );
    setBirds(updatedBirds); 
    setEditingBird(null); 
  };

  const handleDeleteBird = async (birdId) => {
    try {
      const response = await fetch(`${API_URL}/${birdId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBirds(birds.filter((bird) => bird.id !== birdId)); 
      } else {
        console.error('Failed to delete bird.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditBird = (bird) => {
    setEditingBird(bird);
  };

  const handleCancelEdit = () => {
    setEditingBird(null);
  };

  return (
    <div className="App">
      <h1>Bird Watcher App</h1>
      {editingBird ? (
        <BirdEditForm
          bird={editingBird}
          onUpdate={handleUpdateBird}
          onCancel={handleCancelEdit}
        />
      ) : (
        <BirdForm onAdd={handleAddBird} />
      )}
      <BirdList
        birds={birds}
        onDelete={handleDeleteBird}
        onEdit={handleEditBird}
      />
    </div>
  );
}

export default App;
