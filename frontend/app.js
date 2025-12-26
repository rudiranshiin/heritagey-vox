/**
 * Heritagey Vox - British English Curriculum Frontend
 * =====================================================
 *
 * Testing interface for the curriculum API with OpenAI Voice integration
 */

// Configuration
const API_BASE_URL = 'http://localhost:4002';
const OPENAI_REALTIME_URL = 'https://us.api.openai.com/v1/realtime';
const MODEL = 'gpt-4o-realtime-preview-2024-12-17';

// State
let selectedModule = null;
let selectedScenario = null;
let currentLevel = 'all';
let currentLanguage = 'en-GB';
let voice = 'ash';

// Voice connection state
let peerConnection = null;
let mediaStream = null;
let dataChannel = null;
let isConnected = false;
let isMuted = true;
let audioElement = null;

// DOM Elements
const elements = {};

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', async () => {
  cacheElements();
  setupEventListeners();
  await checkApiStatus();
  await loadLanguages();
  await loadModules();
});

/**
 * Cache DOM elements for performance
 */
function cacheElements() {
  elements.modulesList = document.getElementById('modules-list');
  elements.scenariosContainer = document.getElementById('scenarios-container');
  elements.moduleTitle = document.getElementById('module-title');
  elements.moduleDescription = document.getElementById('module-description');
  elements.languageSelect = document.getElementById('language-select');
  elements.voiceSelect = document.getElementById('voice-select');
  elements.connectionBtn = document.getElementById('connection-btn');
  elements.micBtn = document.getElementById('mic-btn');
  elements.connectionStatus = document.getElementById('connection-status');
  elements.transcript = document.getElementById('transcript');
  elements.selectedScenario = document.getElementById('selected-scenario');
  elements.selectedScenarioTitle = document.getElementById('selected-scenario-title');
  elements.scenarioContext = document.getElementById('scenario-context');
  elements.apiStatus = document.getElementById('api-status');
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // Level filter buttons
  document.querySelectorAll('.level-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.level-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentLevel = btn.dataset.level;
      loadModules();
    });
  });

  // Language selector
  elements.languageSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    loadModules();
  });

  // Voice selector
  elements.voiceSelect.addEventListener('change', (e) => {
    voice = e.target.value;
  });

  // Connection button
  elements.connectionBtn.addEventListener('click', toggleConnection);

  // Mic button
  elements.micBtn.addEventListener('click', toggleMic);
}

/**
 * Check API health status
 */
async function checkApiStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();

    if (data.status === 'healthy' || data.status === 'degraded') {
      elements.apiStatus.classList.add('online');
      elements.apiStatus.innerHTML = '<span class="dot"></span><span>API Online</span>';
    } else {
      throw new Error('API unhealthy');
    }
  } catch (error) {
    elements.apiStatus.innerHTML = '<span class="dot"></span><span>API Offline</span>';
    console.error('API health check failed:', error);
  }
}

/**
 * Load available languages
 */
async function loadLanguages() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/languages`);
    if (response.ok) {
      const data = await response.json();
      const languages = Array.isArray(data) ? data : data.data || [];
      elements.languageSelect.innerHTML = languages
        .map((lang) => `<option value="${lang.code}">${lang.flag} ${lang.name}</option>`)
        .join('');
    }
  } catch (error) {
    console.error('Failed to load languages:', error);
  }
}

/**
 * Load modules from API
 */
async function loadModules() {
  elements.modulesList.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

  try {
    let url = `${API_BASE_URL}/api/v1/curriculum/modules?language=${currentLanguage}`;
    if (currentLevel !== 'all') {
      url += `&level=${currentLevel}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    const modules = Array.isArray(data) ? data : data.data || [];

    if (modules.length > 0) {
      renderModules(modules);
    } else {
      elements.modulesList.innerHTML = `
        <div class="empty-state">
          <p>No modules found</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Failed to load modules:', error);
    elements.modulesList.innerHTML = `
      <div class="empty-state">
        <p>Failed to load modules</p>
      </div>
    `;
  }
}

/**
 * Render modules list
 */
function renderModules(modules) {
  elements.modulesList.innerHTML = modules
    .map(
      (module) => `
    <div class="module-item ${selectedModule?.id === module.id ? 'active' : ''}"
         data-id="${module.id}">
      <p class="module-level">${module.level}</p>
      <p class="module-name">${module.title}</p>
      <p class="module-scenarios">${module.scenarios?.length || module._count?.scenarios || 0} scenarios</p>
    </div>
  `
    )
    .join('');

  // Add click handlers
  document.querySelectorAll('.module-item').forEach((item) => {
    item.addEventListener('click', () => selectModule(item.dataset.id));
  });
}

/**
 * Select a module and load its scenarios
 */
async function selectModule(moduleId) {
  document.querySelectorAll('.module-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.id === moduleId);
  });

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/curriculum/modules/${moduleId}`);
    const data = await response.json();
    selectedModule = data.data || data;

    elements.moduleTitle.textContent = selectedModule.title;
    elements.moduleDescription.textContent = selectedModule.description;

    renderScenarios(selectedModule.scenarios || []);
  } catch (error) {
    console.error('Failed to load module:', error);
  }
}

/**
 * Render scenarios grid
 */
function renderScenarios(scenarios) {
  if (scenarios.length === 0) {
    elements.scenariosContainer.innerHTML = `
      <div class="empty-state">
        <div class="icon">📝</div>
        <h3>No scenarios yet</h3>
        <p>This module doesn't have any scenarios defined</p>
      </div>
    `;
    return;
  }

  elements.scenariosContainer.innerHTML = scenarios
    .map((scenario) => {
      const objectives = scenario.objectives || [];
      const duration = scenario.duration || 10;

      return `
      <div class="scenario-card ${selectedScenario?.id === scenario.id ? 'selected' : ''}"
           data-id="${scenario.id}">
        <span class="scenario-type">${scenario.type || 'conversation'}</span>
        <h4 class="scenario-title">${scenario.title}</h4>
        <p class="scenario-description">${scenario.description}</p>
        <div class="scenario-meta">
          <span>⏱️ ${duration} min</span>
          <span>🎯 ${objectives.length} objectives</span>
        </div>
      </div>
    `;
    })
    .join('');

  // Add click handlers
  document.querySelectorAll('.scenario-card').forEach((card) => {
    card.addEventListener('click', () => selectScenario(card.dataset.id, scenarios));
  });
}

/**
 * Select a scenario for practice
 */
function selectScenario(scenarioId, scenarios) {
  selectedScenario = scenarios.find((s) => s.id === scenarioId);

  document.querySelectorAll('.scenario-card').forEach((card) => {
    card.classList.toggle('selected', card.dataset.id === scenarioId);
  });

  if (selectedScenario) {
    elements.selectedScenario.style.display = 'block';
    elements.selectedScenarioTitle.textContent = selectedScenario.title;

    const context = selectedScenario.context || {};
    elements.scenarioContext.textContent = context.situation || selectedScenario.description;

    elements.connectionBtn.disabled = false;
  }
}

/**
 * Build AI instructions based on selected scenario
 */
function buildInstructions() {
  if (!selectedScenario) {
    return 'You are a helpful British English tutor. Help the learner practice conversational English.';
  }

  const context = selectedScenario.context || {};
  const objectives = selectedScenario.objectives || [];
  const vocabulary = selectedScenario.vocabulary || [];
  const grammar = selectedScenario.grammar || [];

  let instructions = `You are a British English conversation partner helping a learner practice real-world scenarios.

SCENARIO: ${selectedScenario.title}
SITUATION: ${context.situation || selectedScenario.description}
${context.setting ? `SETTING: ${context.setting}` : ''}
${context.role ? `YOUR ROLE: ${context.role}` : ''}
${context.learnerRole ? `LEARNER'S ROLE: ${context.learnerRole}` : ''}

LEARNING OBJECTIVES:
${objectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

${
  vocabulary.length > 0
    ? `KEY VOCABULARY TO PRACTICE:
${vocabulary.map((v) => `- ${v.term}: ${v.definition}`).join('\n')}`
    : ''
}

${
  grammar.length > 0
    ? `GRAMMAR FOCUS:
${grammar.map((g) => `- ${g.pattern}: ${g.example}`).join('\n')}`
    : ''
}

GUIDELINES:
- Speak naturally with a British accent and use British English expressions
- Keep responses conversational and not too long
- Gently correct errors when appropriate, but prioritize natural flow
- Encourage the learner and provide positive reinforcement
- If the learner struggles, simplify or rephrase
- Use the target vocabulary and grammar patterns naturally in conversation

Start by setting the scene briefly and inviting the learner to begin the conversation.`;

  return instructions;
}

/**
 * Toggle voice connection
 */
async function toggleConnection() {
  if (!isConnected) {
    await startConnection();
  } else {
    closeConnection();
  }
}

/**
 * Start voice connection
 */
async function startConnection() {
  try {
    updateConnectionStatus('Connecting...', '');
    elements.connectionBtn.textContent = 'Connecting...';
    elements.connectionBtn.disabled = true;

    // Get ephemeral key from auth server
    const token = await getEphemeralKey();

    // Setup WebRTC
    await setupWebRTC(token);

    isConnected = true;
    isMuted = false;
    elements.connectionBtn.textContent = 'End Session';
    elements.connectionBtn.disabled = false;
    elements.micBtn.disabled = false;
    elements.micBtn.classList.remove('muted');
    elements.micBtn.textContent = '🎤 Mute';
    updateConnectionStatus('Connected - Speak now!', 'connected');
  } catch (error) {
    console.error('Connection failed:', error);
    updateConnectionStatus('Connection failed: ' + error.message, 'error');
    elements.connectionBtn.textContent = 'Start Session';
    elements.connectionBtn.disabled = false;
  }
}

/**
 * Get ephemeral key from auth server
 */
async function getEphemeralKey() {
  const response = await fetch(`${API_BASE_URL}/api/v1/voice/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, voice: voice }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get session key');
  }

  const data = await response.json();
  return data.client_secret.value;
}

/**
 * Setup WebRTC connection
 */
async function setupWebRTC(token) {
  peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });

  // Setup audio output
  audioElement = document.createElement('audio');
  audioElement.autoplay = true;
  document.body.appendChild(audioElement);

  peerConnection.ontrack = (event) => {
    audioElement.srcObject = event.streams[0];
  };

  // Setup data channel
  dataChannel = peerConnection.createDataChannel('oai-events');
  setupDataChannelHandlers();

  // Setup microphone
  mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  const audioTrack = mediaStream.getAudioTracks()[0];
  audioTrack.enabled = true;
  peerConnection.addTrack(audioTrack, mediaStream);

  // Create and send offer
  const offer = await peerConnection.createOffer({
    offerToReceiveAudio: true,
    offerToReceiveVideo: false,
  });
  await peerConnection.setLocalDescription(offer);

  // Connect to OpenAI
  const response = await fetch(`${OPENAI_REALTIME_URL}?model=${MODEL}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/sdp',
    },
    body: offer.sdp,
  });

  if (!response.ok) {
    throw new Error(`Failed to connect: ${response.status}`);
  }

  const answer = { type: 'answer', sdp: await response.text() };
  await peerConnection.setRemoteDescription(answer);
}

/**
 * Setup data channel event handlers
 */
function setupDataChannelHandlers() {
  dataChannel.onopen = () => {
    console.log('Data channel opened');

    // Send welcome message with scenario context
    const instructions = buildInstructions();

    const welcomeEvent = {
      type: 'response.create',
      response: {
        modalities: ['audio', 'text'],
        instructions: `Greet the learner and introduce the scenario briefly. Then invite them to start the conversation. ${instructions}`,
        max_output_tokens: 4096,
      },
    };
    dataChannel.send(JSON.stringify(welcomeEvent));

    // Set session instructions
    const sessionUpdate = {
      type: 'session.update',
      session: {
        instructions: instructions,
        turn_detection: {
          type: 'server_vad',
          threshold: 0.5,
          prefix_padding_ms: 400,
          silence_duration_ms: 700,
          create_response: true,
        },
        max_response_output_tokens: 4096,
      },
    };
    dataChannel.send(JSON.stringify(sessionUpdate));
  };

  dataChannel.onclose = () => {
    console.log('Data channel closed');
    updateConnectionStatus('Disconnected', '');
  };

  dataChannel.onmessage = (event) => {
    const realtimeEvent = JSON.parse(event.data);
    console.log('Received:', realtimeEvent.type);

    if (realtimeEvent.type === 'response.audio_transcript.done') {
      addTranscript('AI', realtimeEvent.transcript);
    }
    if (realtimeEvent.type === 'conversation.item.input_audio_transcription.completed') {
      addTranscript('You', realtimeEvent.transcript);
    }
  };
}

/**
 * Close voice connection
 */
function closeConnection() {
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop());
  }
  if (peerConnection) {
    peerConnection.close();
  }
  if (audioElement) {
    audioElement.remove();
  }
  if (dataChannel) {
    dataChannel.close();
  }

  peerConnection = null;
  mediaStream = null;
  audioElement = null;
  dataChannel = null;
  isConnected = false;
  isMuted = true;

  elements.connectionBtn.textContent = 'Start Session';
  elements.micBtn.disabled = true;
  elements.micBtn.classList.add('muted');
  elements.micBtn.textContent = '🎤 Unmute';
  updateConnectionStatus('Session ended', '');
}

/**
 * Toggle microphone
 */
function toggleMic() {
  if (!mediaStream) return;

  isMuted = !isMuted;
  const audioTrack = mediaStream.getAudioTracks()[0];
  if (audioTrack) {
    audioTrack.enabled = !isMuted;
    elements.micBtn.classList.toggle('muted', isMuted);
    elements.micBtn.textContent = isMuted ? '🎤 Unmute' : '🎤 Mute';
    updateConnectionStatus(isMuted ? 'Microphone muted' : 'Microphone active', 'connected');
  }
}

/**
 * Update connection status display
 */
function updateConnectionStatus(message, state) {
  elements.connectionStatus.textContent = message;
  elements.connectionStatus.className = 'connection-status ' + state;
}

/**
 * Add entry to transcript
 */
function addTranscript(role, text) {
  if (!text) return;

  const entry = document.createElement('div');
  entry.className = `transcript-entry ${role}`;
  entry.innerHTML = `<strong>${role}:</strong> ${text}`;
  elements.transcript.appendChild(entry);
  elements.transcript.scrollTop = elements.transcript.scrollHeight;
}
