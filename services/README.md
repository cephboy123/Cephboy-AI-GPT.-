# Services

Les services backend (serverless) sont isolés ici. Le service principal est `generate` qui appelle l'API d'images du provider configuré via la variable `CEPHBOY_OPENAI_KEY`.

Exposez ces endpoints via Vercel serverless functions ou en les déployant sur un cloud provider.
