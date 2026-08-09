import axios from 'axios'

export default async function handler(req, res) {
  // Endpoint serverless pour appel image / génération
  // ATTENTION: aucune clé n'est incluse dans le code. Configurez CEPHBOY_OPENAI_KEY dans les variables d'environnement de Vercel.

  const key = process.env.CEPHBOY_OPENAI_KEY
  if (!key) {
    return res.status(400).json({ error: 'Missing CEPHBOY_OPENAI_KEY environment variable' })
  }

  try {
    const { prompt } = req.body
    if (!prompt) return res.status(400).json({ error: 'Missing prompt' })

    // Exemple générique: adapter selon le provider (OpenAI/Replicate/HuggingFace)
    // Ici nous montrons un appel POST générique (à adapter)
    const resp = await axios.post('https://api.openai.com/v1/images/generations', {
      prompt,
      n: 1,
      size: '1024x1024'
    }, {
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      }
    })

    // Structure de réponse dépend du provider
    return res.status(200).json({ data: resp.data })
  } catch (err) {
    console.error(err?.response?.data || err.message)
    return res.status(500).json({ error: 'generation_failed', details: err?.response?.data || err.message })
  }
}
