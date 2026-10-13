# Gaurav Kothari: portfolio site

MERN stack: React + Vite + Tailwind CSS in `client/`, Express + MongoDB (Mongoose) in `server/`.

## Run locally

```
npm install
npm run dev
```

Opens the site on http://localhost:5173 (the API runs on port 5000 and is proxied under `/api`).

To save contact-form enquiries, copy `server/.env.example` to `server/.env` and set `MONGODB_URI`
(a free MongoDB Atlas cluster is enough). Without it the site works fully; enquiries just aren't stored.

## Edit the content

All text, prices, projects and contact details are in `client/src/data/site.js`.
Anything in `[SQUARE BRACKETS]` is a placeholder.

Screenshots: put the image in `client/public/` (e.g. `client/public/screenshots/home.png`) and set
its path (`/screenshots/home.png`) in the `screenshot` / `screenshots` fields of that file.

## Deploy

One Node service runs everything: Express serves the API and the built React app.

1. Set `VITE_SITE_URL` in `client/.env` to the real domain (needed for WhatsApp link previews).
2. Build command: `npm install && npm run build`
3. Start command: `npm start`
4. Environment variables on the host: `MONGODB_URI`, `ADMIN_TOKEN` (`PORT` is usually set by the host).

## API

| Route | Purpose |
| --- | --- |
| `GET /api/health` | Server and database status |
| `POST /api/enquiries` | Saves a contact-form enquiry (rate limited) |
| `GET /api/enquiries` | Lists saved enquiries; needs the `x-admin-token` header to match `ADMIN_TOKEN` |

## Link preview image

`npm run og` regenerates `client/public/og-image.png` from `client/scripts/og-image.svg`.
