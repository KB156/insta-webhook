export default function handler(req, res) {
    if (req.method === 'GET') {
      const VERIFY_TOKEN = 'krish_custom_token';
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];
  
      if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
          console.log('WEBHOOK_VERIFIED');
          res.status(200).send(challenge);
        } else {
          res.sendStatus(403);
        }
      }
    } else if (req.method === 'POST') {
      console.log('Incoming webhook event:', req.body);
      res.sendStatus(200);
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  }