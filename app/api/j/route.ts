import { type NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
    console.error("In the GET function")
    return new Response("Hello from the GET function")
}