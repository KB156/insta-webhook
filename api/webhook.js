export default function handler(req, res) {
    const VERIFY_TOKEN = "krish_custom_token"; // Use the same token when verifying
  
    if (req.method === "GET") {
      const mode = req.query["hub.mode"];
      const token = req.query["hub.verify_token"];
      const challenge = req.query["hub.challenge"];
  
      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("✅ Webhook Verified!");
        res.status(200).send(challenge);
      } else {
        console.warn("❌ Verification Failed");
        res.sendStatus(403);
      }
    }
  
    else if (req.method === "POST") {
      console.log("📩 Event received:", JSON.stringify(req.body, null, 2));
      res.status(200).send("EVENT_RECEIVED");
    }
  
    else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }