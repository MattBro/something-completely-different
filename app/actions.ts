'use server'

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? 'https://' + process.env.VERCEL_URL
    : "http://localhost:8000";

export async function testActions() {
    console.error('Fetching data from:', BASE_URL + '/api/python');
    const response = await fetch(BASE_URL + '/api/python');
    console.error('Response status:', response.status);
    console.error('Response headers:', response.headers);

    let data;
    try {
        const text = await response.text();
        data = JSON.parse(text);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        throw new Error('Failed to parse JSON response');
    }

    console.error('Parsed data:', data);
    return data;
}
