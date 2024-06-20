'use client'

import { useState } from 'react';
import { testActions, patsAsyncFunction } from '../actions';

export default function ClientSideTest() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  const handleClick = async () => {
      const response2 = await fetch('/api/j');
      setLoading(true);
      try {
        const response = await testActions();

        if (!response.body) {
          throw new Error('Network response was not ok');
        }

        const reader = response.body?.getReader();
        const chunks: Uint8Array[] = [];

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          chunks.push(value);

          // Decode and update data as each chunk is received
          const partialData = new TextDecoder().decode(
            chunks.reduce((acc, chunk, index) => {
                acc.set(chunk, index === 0 ? 0 : chunks.slice(0, index).reduce((sum, chunk) => sum + chunk.length, 0));
                return acc;
            }, new Uint8Array(chunks.reduce((sum, chunk) => sum + chunk.length, 0)))
          );

          setData(partialData); // Update the state with the partial data
        }

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
