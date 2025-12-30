
# ToroChess ♟️

ToroChess is a browser-based chess game built with **React** (frontend) and **Node.js** (backend). Play against a simple bot, view move history, and enjoy a modern, responsive UI. The backend manages stateful games using unique game IDs. Multiplayer and real-time features are planned for the future.

## Project Structure

```
torochess/
├── frontend/                  # React application (Create React App)
│   ├── public/
│   ├── src/
│   │   ├── Sidebar.js        # Sidebar navigation component
│   │   ├── ChessContainer.js # Chessboard, move list, game over overlay
│   │   ├── MoveList.js       # Move history display
│   │   ├── App.js            # Main app layout
│   │   └── index.js
│   ├── package.json
│   └── ...
├── backend/                   # Node.js + Express server
│   ├── src/
│   │   ├── server.js          # Main server file
│   │   └── botApi.js          # Bot move API
│   ├── package.json
│   └── .env
├── .gitignore
└── README.md                  # This file
```



## Features

- Play chess vs a simple bot (random move selection)
- Interactive, draggable chessboard using `react-chessboard` v4
- Move validation and game state management with `chess.js` (frontend and backend)
- Move list/history display
- Game over overlay with winner/draw indication
- Unique game IDs for stateful games (no multiplayer yet)
- Sidebar navigation (UI only, more features planned)
- Modern, responsive UI
- Clean monorepo structure with separate frontend and backend
- Local development with hot reloading for both sides

## Prerequisites

- Node.js (LTS recommended: v20 or v22)
- npm (comes with Node.js)
- Git
- A GitHub account (for version control)

## Local Development Setup

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/karvaporsas/torochess.git
cd torochess

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Environment Variables

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
CLIENT_ORIGIN=http://localhost:3000
```

### 3. Run the Application

From the project root, use one command to start both servers:

```bash
npm run dev
```

This uses `concurrently` to run:
- Frontend: http://localhost:3000 (React dev server with hot reload)
- Backend: http://localhost:5000 (Node.js with nodemon auto-restart)

Open http://localhost:3000 in your browser to play!

### Alternative: Run Separately

```bash
# Terminal 1 - Frontend
cd frontend
npm start

# Terminal 2 - Backend
cd backend
npm run dev
```

## Scripts (Root Level)

Add these to your root `package.json` for easy development:

```json
"scripts": {
  "dev": "concurrently \"npm start --prefix frontend\" \"npm run dev --prefix backend\""
}
```

Backend scripts (in `backend/package.json`):

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
}
```

## Key Libraries Used



**Frontend:**
- `react-chessboard@4` – Responsive, draggable chessboard
- `chess.js` – Chess move validation, FEN/PGN, checkmate detection

**Backend:**
- `express` – Web server
- `chess.js` – Server-side move validation (prevents cheating)
- `cors` & `dotenv` – Cross-origin and config management
- `nodemon` – Auto-restart during development

## Deployment to Azure

- **Frontend**: Deploy via **Azure Static Web Apps** (free tier, GitHub integration)
- **Backend**: Deploy via **Azure App Service** or **Azure Functions** (with Web PubSub for scaling WebSockets)

GitHub Actions can automate both deployments.

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-chess`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-chess`)
5. Open a Pull Request



## Next Features (Planned)

- User authentication
- Switchable bots
- Real-time multiplayer (Socket.io)
- Timer/clock support
- Mobile responsiveness improvements

## License

MIT License – feel free to use, modify, and share!

---

Made with ❤️ and lots of ♟️ by Karvaporsas

Enjoy playing chess!