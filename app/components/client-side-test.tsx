'use client'

import { useState } from 'react';
import axios from 'axios'; // Import the axios library

export default function ClientSideTest() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  const handleClick = async () => {
      const response2 = await axios.get('/api/j/hello', {responseType:"stream"});
      setLoading(true);
      const stream = response2.data;
      console.log('getting the stream')
      
      if (!stream) return;

      let result = '';

      response2.data.on('data', (chunk:any) => {
        // Process each chunk of data as it arrives
        console.log(chunk.toString());
      });
  
      response2.data.on('end', () => {
        console.log('Stream ended');
      });

      // while (true) {
      //   console.log('reading...')

      //   const { done, value } = await reader.read();
      //   console.log('got a read')
      //   if (done) break;
      //   result += new TextDecoder().decode(value);
      //   console.log(result)
      //   setData(result);
      // }
      
      setLoading(false);
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
