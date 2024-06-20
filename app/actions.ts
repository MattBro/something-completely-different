'use server'

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? 'https://' + process.env.VERCEL_URL
    : "http://localhost:8000";

export async function testActions() {
    const response = await fetch(BASE_URL + '/api/p/python');
    const reader = response.body?.getReader();
    let result = '';
    if(reader) {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += new TextDecoder().decode(value);
            console.error(new TextDecoder().decode(value));

            // Stream the value down to the client
            
        }
    }


    console.error('Fetching data from:', BASE_URL + '/api/p/python');
    console.error('Response status:', response.status);
    console.error('Response headers:', response.headers);

    let data;
    try {
        // const text = await response.text();
        // //data = JSON.parse(text);
        // console.error(text)


    } catch (error) {
        console.error('Error parsing JSON:', error);
        throw new Error('Failed to parse JSON response');
    }

    console.error('Parsed data:', data);
    return data;
}


export async function patsAsyncFunction() {
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 1; i <= 5; i++) {
        const chunk = JSON.stringify({ message: `Chunk ${i}` });
        controller.enqueue(new TextEncoder().encode(chunk));
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "application/json" },
  });
}
