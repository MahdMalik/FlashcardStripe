import { admin } from '/firebaseAdmin.js'
// POST method to handle generating the Firebase custom token
// Initialize Firebase Admin SDK if it hasn't been initialized already
export async function POST(request) {
  try {
    // Parse the incoming JSON body
    const { clerkUserId } = await request.json();
    if (!clerkUserId) {
      return new Response(
        JSON.stringify({ error: 'Clerk User ID is required' }),
        { status: 400 }
      );
    }

    // Generate a Firebase custom token with Clerk user ID
    const firebaseCustomToken = await admin.auth().createCustomToken(clerkUserId);
    // Return the Firebase custom token as a JSON response
    return new Response(
      JSON.stringify({ firebaseCustomToken }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error generating Firebase custom token:', err);
    return new Response(
      JSON.stringify({ error: 'Error generating Firebase token' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}