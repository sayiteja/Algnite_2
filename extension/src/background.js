// Handle keyboard shortcut (Ctrl+Shift+Space)
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-voice-control') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleVoiceControl' });
    });
  }
});

// Handle installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Set default settings
    chrome.storage.sync.set({
      settings: {
        voiceSpeed: 1,
        highlightColor: '#4A90E2',
        isHighlightEnabled: false
      }
    });

    // Open welcome page
    chrome.tabs.create({
      url: chrome.runtime.getURL('src/welcome.html')
    });
  }
});

// Handle tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.startsWith('http')) {
    // Inject content script
    chrome.scripting.executeScript({
      target: { tabId },
      files: ['src/content.js']
    });
  }
}); 