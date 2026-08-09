const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/generate', async (req, res) => {
  const key = process.env.CEPHBOY_OPENAI_KEY
  if (!key) return res.status(400).json({ error: 'Missing CEPHBOY_OPENAI_KEY' })
  try {
    const { prompt } = req.body
    const resp = await axios.post('https://api.openai.com/v1/images/generations', { prompt, n: 1, size: '1024x1024' }, { headers: { Authorization: `Bearer ${key}` } })
    res.json(resp.data)
  } catch (e) {
    console.error(e?.response?.data || e.message)
    res.status(500).json({ error: 'generation_failed' })
  }
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log('services:generate listening on', port))
