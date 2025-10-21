import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/apy', async (req, res) => {
  try {
    const { data } = await axios.get('https://yields.llama.fi/pools');
    const filtered = data.data.filter(p => p.symbol === 'USDT');
    res.json(filtered);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3001, () => console.log('Proxy server running on port 3001'));
