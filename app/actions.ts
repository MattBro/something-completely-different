'use server'

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? 'https://' + process.env.VERCEL_URL
    : "http://localhost:8000";

export async function testActions() {
    console.log('Fetching data from:', BASE_URL + '/api/python');
    const response = await fetch(BASE_URL + '/api/python');
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    let data;
    try {
        const text = await response.text();
        console.log('Response text:', text);
        data = JSON.parse(text);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        throw new Error('Failed to parse JSON response');
    }

    console.log('Parsed data:', data);
    return data;
}
