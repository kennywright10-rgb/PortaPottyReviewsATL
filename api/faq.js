const { put, head } = require('@vercel/blob');

const BLOB_KEY = 'faq-data.json';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, CORS).end();
    return;
  }

  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));

  try {
    if (req.method === 'GET') {
      try {
        const meta = await head(BLOB_KEY);
        if (meta) {
          const resp = await fetch(meta.url);
          const data = await resp.json();
          res.status(200).json(data);
          return;
        }
      } catch (_) {
        // Blob doesn't exist yet
      }

      // No blob yet — frontend has its own defaults
      res.status(200).json({ faqs: [] });

    } else if (req.method === 'POST') {
      const data = req.body;

      await put(BLOB_KEY, JSON.stringify(data), {
        access: 'public',
        addRandomSuffix: false,
      });

      res.status(200).json({ success: true });

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error('faq.js error:', err);
    res.status(500).json({ error: err.message });
  }
}
