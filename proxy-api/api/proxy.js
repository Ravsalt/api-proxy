export default async function handler(req, res) {
    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const targetUrl = 'https://api.mangadex.org' + pathname.replace('/api/proxy', '') + '?' + searchParams.toString();
    
    try {
      const response = await fetch(targetUrl, {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'MangaPH-Proxy/1.0',
        },
      });
      
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (err) {
      console.error('Proxy error:', err);
      res.status(500).json({ error: 'Proxy failed' });
    }
  }