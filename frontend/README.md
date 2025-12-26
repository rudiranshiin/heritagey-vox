# Heritagey Vox Frontend

A testing interface for the British English Curriculum API with OpenAI Voice integration.

## Features

- 📚 Browse curriculum modules and scenarios
- 🎤 Voice practice with OpenAI Realtime API
- 🇬🇧 British English focused learning
- 🎯 Scenario-based conversation practice

## Setup

### 1. Start the Backend API

```bash
cd /Users/rrudiyanto/Desktop/AI/project/heritagey-vox
npm run dev
```

The API will run on `http://localhost:4002`

### 2. Start the OpenAI Auth Server

You need an auth server for OpenAI Realtime API. Use your existing one:

```bash
cd /Users/rrudiyanto/Desktop/agentVoice/OpenAI-API-Building-Front-End-Voice-Apps-with-the-Realtime-API-and-WebRTC-2027322/hubspot-voice/auth-server
npm run start:hubspot
```

The auth server runs on `http://localhost:3000`

### 3. Serve the Frontend

Option A - Using Python (quick):
```bash
cd frontend
python3 -m http.server 4003
```

Option B - Using Node.js:
```bash
npx serve frontend -p 4003
```

Then open `http://localhost:4003` in your browser.

## Usage

1. **Select a Module** - Browse modules by level (A2-C2) in the sidebar
2. **Choose a Scenario** - Click a scenario card to select it for practice
3. **Start Voice Session** - Click "Start Session" to connect to the AI tutor
4. **Practice Speaking** - Have a natural conversation in the selected scenario
5. **View Transcript** - See the conversation transcript in real-time

## Configuration

Edit `app.js` to change:

- `API_BASE_URL` - Backend API URL (default: `http://localhost:4002`)
- `AUTH_SERVER_URL` - OpenAI auth server URL (default: `http://localhost:3000`)
- `voice` - Default AI voice (default: `ash` for British accent)

## Voice Options

- **ash** - British accent, refined (recommended)
- **alloy** - Neutral, balanced
- **coral** - Clear, friendly
- **sage** - Wise, authoritative
- **shimmer** - Bright, energetic

