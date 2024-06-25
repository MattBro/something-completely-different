'use client'
import { useState } from 'react';

export default function ClientSideTest() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  const handleClick = () => {
    setLoading(true);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/j/hello', true);
    xhr.responseType = 'text';

    xhr.onprogress = () => {
      const response = xhr.responseText;
      setData(response);
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        setData(xhr.responseText);
      }
      setLoading(false);
    };

    xhr.onerror = () => {
      setLoading(false);
    };

    xhr.send();
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
