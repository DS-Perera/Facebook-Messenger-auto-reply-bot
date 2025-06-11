require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Env vars (create a .env file!)
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_TOKEN   = process.env.PAGE_ACCESS_TOKEN;

// 1) Verification endpoint
app.get('/webhook', (req, res) => {
  const { 'hub.mode': mode, 'hub.verify_token': token, 'hub.challenge': challenge } = req.query;
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  res.sendStatus(403);
});

// Basic API to check server status
app.get('/', (req, res) => {
  res.send('Messenger Webhook Server is Live ✅');
});


// 2) Receiving messages
app.post('/webhook', async (req, res) => {
  const body = req.body;
  if (body.object === 'page') {
    for (const entry of body.entry) {
      for (const event of entry.messaging) {
        const senderId = event.sender.id;
        if (event.message && event.message.text) {
          await handleMessage(senderId, event.message.text);
        }
      }
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// 3) Auto-reply logic
async function handleMessage(senderPsid, receivedText) {
  const response = {
    text: `You said: "${receivedText}".  Thanks for reaching out!`
  };
  await callSendAPI(senderPsid, response);
}

// 4) Call Send API
async function callSendAPI(senderPsid, response) {
  await axios.post(
    `https://graph.facebook.com/v15.0/me/messages?access_token=${PAGE_TOKEN}`,
    {
      recipient: { id: senderPsid },
      message: response
    }
  );
}

// 5) Start server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`Webhook is listening on port ${PORT}`));
