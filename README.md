# POC — Spring Boot + Vite React Three.js

- **Backend:** Spring Boot with REST API, H2 in-memory database, and raw WebSockets (no STOMP).
- **Frontend:** Vite + React + Three.js, built into `src/main/resources/static` and served by Spring Boot.

## Prerequisites

- JDK 17+
- Node 18+ and npm

## Quick start

1. **Build the frontend** (so Spring Boot can serve it):

   ```bash
   cd frontend
   npm install
   npm run build
   cd ..
   ```

2. **Run Spring Boot:**

   ```bash
   ./mvnw spring-boot:run
   ```

3. Open **http://localhost:8099** — you get the React + Three.js app. REST API at `/api/items`, WebSocket at `/ws`, H2 console at `/h2-console`.

## Shell control scripts

- **`./r.sh`** — Starts Spring Boot on port 8099, waits until it is ready, then starts the Vite dev server (frontend) on 5173. Use **http://localhost:5173** for the app with HMR; Vite proxies `/api` and `/ws` to 8099. Run in one terminal; from another, use `./s.sh` to stop.
- **`./s.sh`** — Stops and cleans up the Vite and Spring Boot processes (by saved PIDs and by ports 5173 and 8099 if `lsof` is available).

On Windows, run the scripts from Git Bash or WSL. Ensure `lsof` is available for port-based cleanup (e.g. via Git Bash or WSL).

## Frontend dev (manual)

- Run backend: `./mvnw spring-boot:run`
- Run frontend dev server: `cd frontend && npm run dev`  
  Vite proxies `/api` and `/ws` to port 8099. Use **http://localhost:5173** for HMR.

## H2 console

The app uses a **file-based** H2 database under `./data/pocdb` so data persists across server restarts. After opening the H2 console (DB button or `/h2-console`), use these values in the login form:

| Field         | Value                        |
|---------------|------------------------------|
| **JDBC URL**  | `jdbc:h2:file:./data/pocdb`  |
| **User Name** | `sa`                         |
| **Password**  | *(leave empty)*              |

Run the server from the project root so the path `./data/pocdb` resolves correctly; the database file is created as `data/pocdb.mv.db`.

## API

- `GET/POST /api/items` — list and create items (H2).
- `GET/PUT/DELETE /api/items/{id}` — get, update, delete.
- **WebSocket:** connect to `ws://localhost:8099/ws` (raw text frames; server persists click messages to `clicked` table).

## Project layout

- `src/main/java` — Spring Boot app, REST, WebSocket handler, JPA entity.
- `frontend/` — Vite + React + Three.js; `npm run build` writes to `src/main/resources/static`.
