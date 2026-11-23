# Vantaggio Strategy · sito

Sito di vantaggiostrategy.com: pagine statiche (React, prerenderizzate) servite da un Worker Cloudflare, con il modulo contatti salvato in D1.

- `npm run dev` avvia l'anteprima di sviluppo
- `npm run build` compila in `dist/client`
- `npm run preview` prova il Worker in locale (prima: `npx wrangler d1 migrations apply DB --local`)
- `npm run deploy` compila e pubblica su Cloudflare

Video e poster della salita iniziale stanno in `public/assets/world`.
