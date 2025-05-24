# Algnite Voice Navigator

A Chrome extension that enables voice-controlled navigation and accessibility features for web browsing.

## Features

- **Voice Commands**: Control your browser using natural voice commands
- **Element Highlighting**: Visual feedback for targeted elements
- **Customizable Settings**: Adjust voice speed and highlight colors
- **Keyboard Shortcuts**: Quick toggle with Ctrl+Shift+Space
- **Cross-page Persistence**: Settings are saved across sessions

## Installation

### From Chrome Web Store
1. Visit the Chrome Web Store (link to be added)
2. Click "Add to Chrome"
3. Confirm the installation

### Manual Installation (Development)
1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `extension` directory

## Usage

### Voice Commands
- "Click [element name]" - Click on any element on the page
- "Scroll up/down" - Navigate through the page
- "Go to [link text]" - Click on a specific link
- "Read [element name]" - Have the text read aloud
- "Stop" - Stop voice control

### Settings
- **Voice Speed**: Adjust the speed of the voice feedback
- **Highlight Color**: Choose the color for element highlighting
- **Element Highlighting**: Toggle visual feedback for targeted elements

### Keyboard Shortcuts
- `Ctrl+Shift+Space`: Toggle voice control

## Development

### Project Structure
```
extension/
├── manifest.json
├── src/
│   ├── popup.html
│   ├── popup.css
│   ├── popup.js
│   ├── content.js
│   ├── background.js
│   └── welcome.html
└── assets/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Building
1. Make changes to the source files
2. Reload the extension in `chrome://extensions/`
3. Test the changes

### Testing
- Test voice commands on various websites
- Verify element highlighting functionality
- Check settings persistence
- Ensure keyboard shortcuts work as expected

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request


## Support

For support, please:
1. Check the [documentation](docs/)
2. Open an issue in the repository
3. Contact the development team

## Acknowledgments

- Chrome Extension API
- Web Speech API
- Chrome Storage API 