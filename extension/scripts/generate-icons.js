const fs = require('fs');
const { createCanvas } = require('canvas');

// Create assets directory if it doesn't exist
if (!fs.existsSync('../assets')) {
  fs.mkdirSync('../assets');
}

// Icon sizes
const sizes = [16, 48, 128];

// Generate icons
sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#4A90E2';
  ctx.beginPath();
  ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
  ctx.fill();

  // Microphone icon
  ctx.fillStyle = 'white';
  const micWidth = size * 0.4;
  const micHeight = size * 0.6;
  const micX = (size - micWidth) / 2;
  const micY = (size - micHeight) / 2;

  // Microphone body
  ctx.fillRect(micX, micY, micWidth, micHeight);

  // Microphone stand
  const standWidth = size * 0.2;
  const standHeight = size * 0.2;
  const standX = (size - standWidth) / 2;
  const standY = micY + micHeight;
  ctx.fillRect(standX, standY, standWidth, standHeight);

  // Save the icon
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`../assets/icon${size}.png`, buffer);
});

console.log('Icons generated successfully!'); 