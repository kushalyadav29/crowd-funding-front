import React, { useEffect, useState } from 'react';
import './TreeCounter.css'; 
import axios from 'axios';

function TreeCounter() {
  const [count, setCount] = useState(0);
  const finalCount = 245136420; // Initial count (the final goal)

  // Function to fetch tree count from the server
  const fetchTreeCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/treeCount');
      setCount(response.data.treeCount); // Update state with the fetched count
    } catch (error) {
      console.error('Error fetching tree count:', error);
    }
  };

  useEffect(() => {
    // Start by fetching the initial tree count
    fetchTreeCount();

    // Set an interval to fetch the updated tree count every 30 seconds
    const intervalId = setInterval(() => {
      fetchTreeCount();
    }, 30000); // Update every 30 seconds (you can adjust this as needed)

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []); // Empty dependency array so this runs only once when the component mounts

  return (
    <div className="tree-counter-container">
      <span className="tree-counter-count">
        {count.toLocaleString()} {/* Display the number with commas */}
      </span>
      <span className="tree-counter-label">Trees Planted</span>
    </div>
  );
}

export default TreeCounter;
