# Didier Shoes Store

Online shoe store with daily promotions, WhatsApp ordering, and an admin panel.

- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js + Express + MySQL
- **Live site:** http://dss.finverra.co

## Run locally

```bash
npm install
cd server && npm install && cd ..
npm run dev
```

Admin: `/admin/login` (credentials from `server/.env`)

## Production build

```bash
npm run build
```

Deploy the `server/` folder and `build/` output to your hosting (e.g. cPanel Node.js app).
