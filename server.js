
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Contact endpoint — stores messages to data/messages.json
const DATA_DIR = path.join(__dirname, 'data');
const MSG_PATH = path.join(DATA_DIR, 'messages.json');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(MSG_PATH)) fs.writeFileSync(MSG_PATH, '[]');

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const entry = {
    name, email, subject, message,
    ts: new Date().toISOString(),
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
  };
  try {
    const arr = JSON.parse(fs.readFileSync(MSG_PATH, 'utf8'));
    arr.push(entry);
    fs.writeFileSync(MSG_PATH, JSON.stringify(arr, null, 2));
  } catch (e) {
    return res.status(500).json({ error: 'Failed to save message' });
  }
  res.json({ ok: true });
});

// Fallback to index.html for root
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`▶ Portfolio running on http://localhost:${PORT}`));
