import { put, head } from '@vercel/blob';

export const config = {
  runtime: 'edge',
};

const BLOB_KEY = 'faq-data.json';

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

      // Return default FAQ data
      const defaultData = {
        faqs: [
          {
            id: 'faq-1',
            question: 'How many porta potties do I need for my event?',
            answer: '<p>The number depends on guest count, duration, and alcohol service. General guideline: 1 unit per 50 guests for 4-hour events.</p>',
            category: 'Planning',
            order: 1
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
