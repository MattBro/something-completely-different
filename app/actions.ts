'use server'

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? 'https://' + process.env.VERCEL_URL
    : "http://localhost:8000";
export async function testActions() {
    const response = await fetch(BASE_URL + '/api/p/python');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    if (!response.body) {
        throw new Error('Response body is null');
    }
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let done = false;

    while (!done) {
        const { value, done: readerDone } = await reader.read();
        if (readerDone) {
            done = true;
        } else {
            chunks.push(value);
        }
    }

    const completeData = new TextDecoder().decode(
        chunks.reduce((acc, chunk, index) => {
            acc.set(chunk, index === 0 ? 0 : chunks.slice(0, index).reduce((sum, chunk) => sum + chunk.length, 0));
            return acc;
        }, new Uint8Array(chunks.reduce((sum, chunk) => sum + chunk.length, 0)))
    );

    console.log(completeData);
    return completeData;
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
