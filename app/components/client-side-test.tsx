'use client'

import { useState } from 'react';
import { testActions } from '../actions';

export default function ClientSideTest() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  const handleClick = async () => {
      const response2 = await fetch('/api/j');
      setLoading(true);
      try {
          const response = await testActions();
          setData(response); // Update the state with the partial data
      } catch (error) {
        alert('An error occurred');
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>
      <div>{data}</div>

      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
    </div>
  );
}
