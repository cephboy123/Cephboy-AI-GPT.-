import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import MarkdownEditor from '../src/components/MarkdownEditor'

export default function Home() {
  const [output, setOutput] = useState(null)

  return (
    <div>
      <Head>
        <title>Cephboy AI GPT</title>
        <meta name="description" content="Cephboy AI GPT — merged web app" />
      </Head>
      <main style={{padding: 20, fontFamily: 'Inter, system-ui, Arial'}}>
        <h1>Cephboy AI GPT</h1>
        <p>Application web prête pour Vercel. Rendu Markdown, Mermaid, KaTeX, génération d'images via API.</p>
        <MarkdownEditor />
      </main>
    </div>
  )
}
