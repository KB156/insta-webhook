export default function handler(req, res) {
    const VERIFY_TOKEN = 'krish_custom_token';
  
    if (req.method === 'GET') {
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];
  
      if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
      } else {
        res.sendStatus(403);
      }
    } else if (req.method === 'POST') {
      console.log('Webhook event received:', JSON.stringify(req.body, null, 2));
      res.sendStatus(200);
    } else {
      res.status(405).end();
    }
  }