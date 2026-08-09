# Cephboy AI GPT — Monorepo

Ce repository contient une structure monorepo conçue pour fusionner les fonctionnalités issues de trois projets sources (lencx/ChatGPT, xtekky/chatgpt-clone, Chanzhaoyu/chatgpt-web) dans une base cohérente, optimisée pour déploiement web sur Vercel.

Structure proposée :

- /web — application Next.js (interface web prête pour Vercel)
- /services — services backend légers (serverless / API endpoints)
- /desktop — adaptation / notes pour desktop (Electron / Tauri) (placeholders)
- /docs — notes de fusion, rapport de modifications, checklist de sécurité

J’ai copié et adapté les composants essentiels dans /web et isolé le service de génération d’images dans /services pour clarifier le découpage.

Voir README-FR.md pour instructions de déploiement sur Vercel.
