# NOTEAPP

A full-stack notes application with user authentication.

- Frontend: React + Vite + Tailwind CSS
- Backend: Express + MongoDB (Mongoose) + JWT
- Current goal: user register/login and authenticated note creation

This README is written as a handoff document so another engineer or model can understand the current system quickly and continue development safely.

## 1. Workspace Layout

```text
NOTEAPP/
  backend/
    db/
      db.js
    model/
      notemodal.js
      user.js
    routes/
      auth.js
      Note.js
    package.json
    server.js
  frontend/
    src/
      components/
        Footer.jsx
        Navbar.jsx
        NoteModal.jsx
      context/
        ContextProvider.jsx
      pages/
        Home.jsx
        Login.jsx
        Singnup.jsx
      App.jsx
      index.css
      main.jsx
    index.html
    package.json
```

Important naming notes:
- `Singnup.jsx` is intentionally named with a typo in filename (`Singnup`, not `Signup`).
- `notemodal.js` and `routes/Note.js` are the current note-related backend files.

## 2. Tech Stack

## Backend
- Node.js + Express
- Mongoose + MongoDB
- bcrypt for password hashing
- jsonwebtoken for auth tokens
- cors + dotenv

## Frontend
- React 19 + Vite
- react-router-dom
- axios
- tailwindcss
- react-toastify

## 3. Backend Overview

## Entry Point
File: `backend/server.js`

Responsibilities:
- Load env vars with `dotenv`
- Setup JSON parsing middleware
- Setup CORS with:
  - `origin: http://localhost:5173`
  - `credentials: true`
- Connect to MongoDB via `connectToMongo()`
- Mount auth router at `/api`
- Start server on `process.env.PORT`

Current mount status:
- `auth` routes are mounted
- `note` routes are not mounted in `server.js` yet

## DB Connection
File: `backend/db/db.js`

- Uses `mongoose.connect(process.env.MONGO_DB_URI)`
- Logs success or error

## Models

### User model
File: `backend/model/user.js`

Schema:
- `name: String, required`
- `email: String, required, unique`
- `password: String, required`

Export style:
- CommonJS (`module.exports = user`)

### Note model (current state)
File: `backend/model/notemodal.js`

Intended schema fields:
- `title`
- `description`
- `userId` (ObjectId ref user)

Current status:
- File contains implementation issues (constructor/exports/spelling) and needs normalization to backend CommonJS style before production use.

## Routes

### Auth routes
File: `backend/routes/auth.js`
Mounted at: `/api`

Endpoints:
- `POST /api/register`
- `POST /api/login`

`POST /api/register`
- Body: `{ name, email, password }`
- Checks existing user by email
- Hashes password with bcrypt salt rounds `10`
- Saves user

`POST /api/login`
- Body: `{ email, password }`
- Validates email/password
- Returns JWT signed with:
  - `process.env.JWT_SECRET_KEY`
  - `expiresIn: process.env.TOKEN_EXPIRY_TIME`

Auth route response-key caveat:
- Some register responses currently use key `meassage` instead of `message`.
- Frontend expects `message` in multiple places.

### Note routes (current state)
File: `backend/routes/Note.js`

- Route skeleton exists for `POST /add`
- Uses ESM import/export style unlike rest of backend CommonJS files
- Not currently mounted in `server.js`
- Not yet implemented end-to-end with model/auth validation

## 4. Frontend Overview

## App bootstrap
File: `frontend/src/main.jsx`

- Renders `<App />` inside `<ContextProvider>`

## Router
File: `frontend/src/App.jsx`

Routes:
- `/` -> `Home`
- `/home` -> `Home`
- `/login` -> `Login`
- `/register` -> `Signup` component from `Singnup.jsx`

Also includes:
- `ToastContainer` from `react-toastify`
- Toast stylesheet import

## Global auth state
File: `frontend/src/context/ContextProvider.jsx`

Provides context values:
- `user`
- `login(user)`

Current behavior:
- `login` updates in-memory state only
- token persistence is done manually in `Login.jsx` via `localStorage`
- no logout method in context yet

## Pages

### Signup page
File: `frontend/src/pages/Singnup.jsx`

- Controlled form: name, email, password
- API call: `POST http://localhost:3212/api/register`
- Shows toast on success/failure

Important mismatch:
- Page reads `response.data.message`
- backend register route may return `response.data.meassage`
- this can cause empty/missing toast text

### Login page
File: `frontend/src/pages/Login.jsx`

- Controlled form: email, password
- API call: `POST http://localhost:3212/api/login`
- On success:
  - alerts user
  - stores user in context via `login(response.data.user)`
  - stores token in `localStorage`
  - navigates to `/home`

### Home page
File: `frontend/src/pages/Home.jsx`

- Displays `Navbar`
- Floating `+` button opens `NoteModal`
- On modal submit, calls:
  - `POST http://localhost:3212/api/note/add` with `{ title, description }`

Current note flow status:
- frontend call exists
- backend `/api/note/add` is not fully implemented/wired yet

## Components

### Navbar
File: `frontend/src/components/Navbar.jsx`

- Shows Login/Signup when user is not present
- Shows username + Logout button when user exists
- Search input UI present, but no search logic implemented
- Logout button currently has no handler

### NoteModal
File: `frontend/src/components/NoteModal.jsx`

Props:
- `closeModal`
- `addNote(title, description)`

Behavior:
- Calls parent `addNote` on submit
- Overlay click closes modal

### Footer
File: `frontend/src/components/Footer.jsx`

- Placeholder only

## Styling
- Tailwind directives are in `frontend/src/index.css`
- Tailwind config in `frontend/tailwind.config.js`

## 5. Environment Variables

Create `backend/.env` with at least:

```env
PORT=3212
MONGO_DB_URI=<your_mongodb_connection_string>
JWT_SECRET_KEY=<your_secret>
TOKEN_EXPIRY_TIME=1d
```

Notes:
- Frontend currently hardcodes backend base URL `http://localhost:3212`
- CORS currently allows only `http://localhost:5173`

## 6. Local Development

## Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

## Run backend

```bash
cd backend
npm run dev
```

## Run frontend

```bash
cd frontend
npm run dev
```

Frontend default Vite URL is typically `http://localhost:5173`.

## 7. API Contract Snapshot

## Register
`POST /api/register`

Request body:
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "secret123"
}
```

Intended response shape:
```json
{
  "success": true,
  "message": "user registered successfully"
}
```

Current implementation caveat:
- Actual key may be `meassage` instead of `message`

## Login
`POST /api/login`

Request body:
```json
{
  "email": "alice@example.com",
  "password": "secret123"
}
```

Successful response shape:
```json
{
  "success": true,
  "token": "<jwt>",
  "user": { "name": "Alice" },
  "message": "Loged in successfully"
}
```

## Add Note (planned)
`POST /api/note/add`

Expected body:
```json
{
  "title": "My Note",
  "description": "Note details"
}
```

Expected auth:
- JWT token should be required (not fully implemented yet)

## 8. Known Issues and Gaps

1. Inconsistent response keys in register route (`meassage` vs `message`).
2. `backend/routes/Note.js` is incomplete and not mounted.
3. `backend/model/notemodal.js` needs cleanup and export alignment.
4. No auth middleware for protecting note endpoints yet.
5. Frontend note creation does not send auth token.
6. Logout button has no implementation.
7. Search input in navbar has no logic.
8. No tests in backend/frontend currently.

## 9. Suggested Next Implementation Order

1. Normalize backend note model (`notemodal.js`) and note routes to CommonJS.
2. Add JWT auth middleware and protect note routes.
3. Mount note router in `server.js` under `/api/note`.
4. Update frontend note calls to include token in request headers.
5. Standardize backend API response schema (`message`, `success`, optional `data`).
6. Add logout behavior and optional route guards in frontend.
7. Add basic validation and error handling consistency.

## 10. Conventions To Keep

- Keep backend module format consistent (currently CommonJS).
- Keep API prefix under `/api`.
- Keep frontend page route names stable unless refactoring intentionally.
- If renaming `Singnup.jsx`, update imports and routes together.

## 11. Minimal Handoff Summary

If another model starts from zero, it should do this first:
1. Read `backend/server.js`, `backend/routes/auth.js`, `frontend/src/App.jsx`, `frontend/src/pages/Singnup.jsx`, `frontend/src/pages/Home.jsx`.
2. Fix register response key mismatch (`message` typo issue).
3. Implement and mount note routes/model.
4. Add token-based auth on note creation path.
5. Verify flows manually:
   - Register
   - Login
   - Create note
