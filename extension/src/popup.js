// DOM Elements
const toggleVoiceButton = document.getElementById('toggleVoice');
const toggleHighlightButton = document.getElementById('toggleHighlight');
const voiceSpeedInput = document.getElementById('voiceSpeed');
const highlightColorInput = document.getElementById('highlightColor');
const statusDot = document.querySelector('.status-dot');
const statusText = document.querySelector('.status-text');

// State
let isListening = false;
let settings = {
  voiceSpeed: 1,
  highlightColor: '#4A90E2',
  isHighlightEnabled: false
};

// Load settings from storage
chrome.storage.sync.get(['settings'], (result) => {
  if (result.settings) {
    settings = result.settings;
    voiceSpeedInput.value = settings.voiceSpeed;
    highlightColorInput.value = settings.highlightColor;
  }
});

// Save settings to storage
function saveSettings() {
  chrome.storage.sync.set({ settings });
}

// Update UI based on listening state
function updateListeningState(isActive) {
  isListening = isActive;
  statusDot.style.backgroundColor = isActive ? 'var(--success-color)' : 'var(--error-color)';
  statusText.textContent = isActive ? 'Listening...' : 'Voice Control Off';
  toggleVoiceButton.querySelector('.text').textContent = isActive ? 'Stop Voice Control' : 'Start Voice Control';
}

// Toggle voice control
toggleVoiceButton.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (!isListening) {
    chrome.tabs.sendMessage(tab.id, { action: 'startListening' });
    updateListeningState(true);
  } else {
    chrome.tabs.sendMessage(tab.id, { action: 'stopListening' });
    updateListeningState(false);
  }
});

// Toggle element highlight
toggleHighlightButton.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  settings.isHighlightEnabled = !settings.isHighlightEnabled;
  
  chrome.tabs.sendMessage(tab.id, {
    action: 'toggleHighlight',
    highlightEnabled: settings.isHighlightEnabled,
    highlightColor: settings.highlightColor
  });
  
  toggleHighlightButton.querySelector('.text').textContent = 
    settings.isHighlightEnabled ? 'Disable Highlight' : 'Enable Highlight';
  
  saveSettings();
});

// Update voice speed
voiceSpeedInput.addEventListener('input', (e) => {
  settings.voiceSpeed = parseFloat(e.target.value);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'updateVoiceSpeed',
      speed: settings.voiceSpeed
    });
  });
  saveSettings();
});

// Update highlight color
highlightColorInput.addEventListener('input', (e) => {
  settings.highlightColor = e.target.value;
  if (settings.isHighlightEnabled) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'updateHighlightColor',
        color: settings.highlightColor
      });
    });
  }
  saveSettings();
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'listeningStateChanged') {
    updateListeningState(message.isListening);
  }
});

// Initialize state from content script
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: 'getState' }, (response) => {
    if (response) {
      updateListeningState(response.isListening);
      settings.isHighlightEnabled = response.isHighlightEnabled;
      toggleHighlightButton.querySelector('.text').textContent = 
        settings.isHighlightEnabled ? 'Disable Highlight' : 'Enable Highlight';
    }
  });
}); 