import { put, head } from '@vercel/blob';

export const config = {
  runtime: 'edge',
};

const BLOB_KEY = 'blog-data.json';

export default async function handler(req) {
  const { method } = req;

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
      try {
        const blobExists = await head(BLOB_KEY);
        
        if (blobExists) {
          const response = await fetch(blobExists.url);
          const data = await response.json();
          return new Response(JSON.stringify(data), { status: 200, headers });
        }
      } catch (error) {
        console.log('No blob found, returning default data');
      }

      // Return default data if blob doesn't exist
      const defaultData = {
        posts: [
          {
            id: 'how-many-porta-potties',
            title: 'How Many Porta Potties Do I Need for My Event?',
            slug: 'how-many-porta-potties',
            excerpt: 'Planning an outdoor event? Learn the industry-standard ratios for determining the right number of portable restrooms based on your guest count, event duration, and type.',
            content: '<p>One of the most common questions we hear from event planners is: "How many porta potties do I need?" The answer depends on several factors, including your guest count, event duration, and whether alcohol will be served.</p><h2>General Guidelines</h2><p>For a 4-hour event without alcohol, the standard ratio is:</p><ul><li>1 porta potty per 50 guests for the first 4 hours</li><li>Add 1 additional unit per 50 guests for each additional 4 hours</li><li>At least 1 ADA-compliant unit for events with 100+ guests</li></ul>',
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=500&fit=crop',
            date: '2026-01-28',
            author: 'Atlanta Metro PP Reviews'
          }
        ]
      };

      return new Response(JSON.stringify(defaultData), { status: 200, headers });

    } else if (method === 'POST') {
      const data = await req.json();
      
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
