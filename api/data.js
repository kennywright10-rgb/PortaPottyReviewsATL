import { put, head } from '@vercel/blob';

export const config = {
  runtime: 'edge',
};

const BLOB_KEY = 'portapotty-data.json';

export default async function handler(req) {
  const { method } = req;

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  try {
    if (method === 'GET') {
      // Get data from Vercel Blob
      try {
        const blobExists = await head(BLOB_KEY);
        
        if (blobExists) {
          const response = await fetch(blobExists.url);
          const data = await response.json();
          return new Response(JSON.stringify(data), { status: 200, headers });
        }
      } catch (error) {
        // Blob doesn't exist, return default data
        console.log('No blob found, returning default data');
      }

      // Return default data if blob doesn't exist
      const defaultData = {
        cities: [
          { id: 'atlanta', name: 'Atlanta', slug: 'atlanta' },
          { id: 'alpharetta', name: 'Alpharetta', slug: 'alpharetta' },
          { id: 'marietta', name: 'Marietta', slug: 'marietta' },
          { id: 'roswell', name: 'Roswell', slug: 'roswell' },
          { id: 'sandy-springs', name: 'Sandy Springs', slug: 'sandy-springs' },
          { id: 'johns-creek', name: 'Johns Creek', slug: 'johns-creek' },
          { id: 'duluth', name: 'Duluth', slug: 'duluth' },
          { id: 'lawrenceville', name: 'Lawrenceville', slug: 'lawrenceville' }
        ],
        companies: []
      };

      return new Response(JSON.stringify(defaultData), { status: 200, headers });

    } else if (method === 'POST') {
      // Save data to Vercel Blob
      const data = await req.json();
      
      // Upload to Vercel Blob
      const blob = await put(BLOB_KEY, JSON.stringify(data), {
        access: 'public',
        addRandomSuffix: false,
      });

      return new Response(
        JSON.stringify({ success: true, url: blob.url }), 
        { status: 200, headers }
      );

    } else {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }), 
        { status: 405, headers }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers }
    );
  }
}
