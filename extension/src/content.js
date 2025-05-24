// State
let isListening = false;
let isHighlightEnabled = false;
let highlightColor = '#4A90E2';
let voiceSpeed = 1;
let recognition = null;
let speechSynthesis = window.speechSynthesis;
let currentHighlightedElement = null;

// Initialize speech recognition
function initializeSpeechRecognition() {
  if (!('webkitSpeechRecognition' in window)) {
    console.error('Speech recognition not supported');
    return;
  }

  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    isListening = true;
    chrome.runtime.sendMessage({ type: 'listeningStateChanged', isListening: true });
  };

  recognition.onend = () => {
    isListening = false;
    chrome.runtime.sendMessage({ type: 'listeningStateChanged', isListening: false });
  };

  recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1];
    if (result.isFinal) {
      const command = result[0].transcript.toLowerCase().trim();
      processCommand(command);
    }
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    speak('Error in speech recognition. Please try again.');
  };
}

// Process voice commands
function processCommand(command) {
  console.log('Processing command:', command);

  // Click command
  if (command.startsWith('click')) {
    const target = command.replace('click', '').trim();
    const element = findElement(target);
    if (element) {
      element.click();
      speak(`Clicked ${target}`);
    } else {
      speak(`Could not find ${target}`);
    }
  }
  // Scroll command
  else if (command.includes('scroll')) {
    if (command.includes('up')) {
      window.scrollBy(0, -300);
      speak('Scrolling up');
    } else if (command.includes('down')) {
      window.scrollBy(0, 300);
      speak('Scrolling down');
    }
  }
  // Go to link command
  else if (command.startsWith('go to')) {
    const linkText = command.replace('go to', '').trim();
    const link = findLink(linkText);
    if (link) {
      link.click();
      speak(`Navigating to ${linkText}`);
    } else {
      speak(`Could not find link ${linkText}`);
    }
  }
  // Read command
  else if (command.startsWith('read')) {
    const target = command.replace('read', '').trim();
    const element = findElement(target);
    if (element) {
      const text = element.textContent.trim();
      speak(text);
    } else {
      speak(`Could not find ${target}`);
    }
  }
  // Stop command
  else if (command === 'stop') {
    stopListening();
    speak('Voice control stopped');
  }
}

// Find element by text content or attributes
function findElement(target) {
  // Try to find by text content
  const elements = Array.from(document.querySelectorAll('*'));
  return elements.find(element => {
    const text = element.textContent.toLowerCase().trim();
    return text === target || text.includes(target);
  });
}

// Find link by text content
function findLink(linkText) {
  const links = Array.from(document.querySelectorAll('a'));
  return links.find(link => {
    const text = link.textContent.toLowerCase().trim();
    return text === linkText || text.includes(linkText);
  });
}

// Highlight element
function highlightElement(element) {
  if (!isHighlightEnabled) return;
  
  if (currentHighlightedElement) {
    currentHighlightedElement.style.outline = '';
  }
  
  currentHighlightedElement = element;
  element.style.outline = `2px solid ${highlightColor}`;
}

// Speak text
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = voiceSpeed;
  speechSynthesis.speak(utterance);
}

// Start listening
function startListening() {
  if (!recognition) {
    initializeSpeechRecognition();
  }
  recognition.start();
}

// Stop listening
function stopListening() {
  if (recognition) {
    recognition.stop();
  }
}

// Handle messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'startListening':
      startListening();
      break;
    case 'stopListening':
      stopListening();
      break;
    case 'toggleHighlight':
      isHighlightEnabled = message.highlightEnabled;
      highlightColor = message.highlightColor;
      break;
    case 'updateVoiceSpeed':
      voiceSpeed = message.speed;
      break;
    case 'updateHighlightColor':
      highlightColor = message.color;
      break;
    case 'getState':
      sendResponse({
        isListening,
        isHighlightEnabled
      });
      break;
  }
});

// Initialize
initializeSpeechRecognition(); 