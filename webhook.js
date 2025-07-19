const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Webhook verification endpoint
app.get("/webhook", (req, res) => {
    const VERIFY_TOKEN = "krish_custom_token"; // Your custom token
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token === VERIFY_TOKEN) {
        console.log("Webhook Verified!");
        res.status(200).send(challenge);
    } else {
        console.error("Verification Failed");
        res.sendStatus(403);
    }
});

// Webhook event receiver
app.post("/webhook", (req, res) => {
    console.log("Event Received:", JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
