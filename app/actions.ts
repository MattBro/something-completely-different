'use server'


export async function testActions() {
    const response = await fetch('http://localhost:8000/api/python');
    const data = await response.json();
    return data;
}
