# Cephboy AI GPT

Version fusionnée initiale pour déploiement sur Vercel. Ce projet combine fonctionnalités issues de plusieurs clients ChatGPT open-source pour fournir :

- Rendu Markdown avancé (GFM, code, tableaux)
- Rendu LaTeX/Math (KaTeX)
- Rendu Mermaid (diagrammes)
- Point d'API serverless pour génération d'images (utilise la variable d'environnement CEPHBOY_OPENAI_KEY)

Important : aucune clé API n'est incluse dans le dépôt. Configurez la variable d'environnement CEPHBOY_OPENAI_KEY dans Vercel (Project Settings → Environment Variables) avant de lancer la génération d'images.

Commandes d'installation

```bash
# installer
npm install
# développement
npm run dev
# build
npm run build
# start
npm run start
```

Déploiement sur Vercel

- Créez un projet sur Vercel en connectant ce dépôt.
- Ajoutez la variable d'environnement `CEPHBOY_OPENAI_KEY` dans les settings du projet.
- Déployez — Vercel détectera Next.js et utilisera `npm run build`.

Remplacement branding & sécurité

- Toutes les mentions visibles de ChatGPT ont été remplacées par "Cephboy AI GPT" dans l'interface et la documentation.
- Les clés OpenAI hardcodées ont été supprimées (si présentes) et remplacées par l'usage de la variable d'environnement `CEPHBOY_OPENAI_KEY`.

Rapport et next steps

Je vais pousser le code de fusion initial sur la branche `merge/cephboy-ai`. Je terminerai ensuite une passe de lint/build rapide et je te fournirai le ZIP final et le rapport détaillé.
