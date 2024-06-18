'use server'

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? 'https://' + process.env.VERCEL_URL
    : "http://localhost:8000";

export async function testActions() {
    const response = await fetch(BASE_URL + '/api/python');
    const data = await response.json();
    return data;
}
