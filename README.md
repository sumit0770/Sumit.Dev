# Sumit Portfolio (MERN)

## Folder Structure

sumit_portfolio/
├── client/          # React + Vite + Tailwind frontend
├── server/          # Express + MongoDB backend (TypeScript)
└── package.json     # Root scripts to run both apps

## Setup

1. Copy env files:
   - `cp server/.env.example server/.env`
   - `cp client/.env.example client/.env`

2. Install dependencies:
   - `npm run install:all`

3. Start MongoDB locally (or set a remote `MONGO_URI` in `server/.env`).

4. Seed sample data:
   - `npm run seed`

5. Run both frontend and backend:
   - `npm run dev`

## API Endpoints

- `GET /api/projects`
- `GET /api/skills`
- `GET /api/opensource`
- `GET /api/experience`
- `POST /api/contact`

## Ports

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
