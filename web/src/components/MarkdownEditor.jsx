import React, { useState } from 'react'
import MarkdownPreview from './MarkdownPreview'

export default function MarkdownEditor() {
  const [text, setText] = useState(`# Exemple\n\nÉcrire du Markdown ici.\n\n`)

  const handleGenerateImage = async () => {
    const resp = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: text })
    })
    const data = await resp.json()
    console.log('image result', data)
    alert('Génération envoyée — consulter la console pour la réponse brute.')
  }

  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
      <div>
        <textarea value={text} onChange={e => setText(e.target.value)} style={{width: '100%', height: '60vh'}} />
        <div style={{marginTop: 8}}>
          <button onClick={handleGenerateImage}>Générer image (API)</button>
        </div>
      </div>
      <div>
        <h3>Aperçu</h3>
        <MarkdownPreview value={text} />
      </div>
    </div>
  )
}
