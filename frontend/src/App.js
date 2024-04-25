import React, { useEffect, useState } from 'react';
import CollectionsTable from './components/CollectionsTable';
import './App.css';

function App() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('http://localhost:8000/collections');

        if (!response.ok) {
          console.log('Fetch failed with status', response.status);
          return;
        }

        const collections = await response.json();
        //console.table(collections);
        setCollections(collections);
      } catch (error) {
        console.log('Error fetching collections:', error.message);
      }
    }

    fetchCollections();
  }, []);

  return (
    <div className='App'>
      <CollectionsTable collections={collections} />
    </div >
  );
}

export default App;
