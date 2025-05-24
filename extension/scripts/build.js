const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Create a file to stream archive data to
const output = fs.createWriteStream(path.join(distDir, 'algnite-voice-navigator.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', () => {
  console.log(`Extension packaged successfully! Total bytes: ${archive.pointer()}`);
});

// Handle warnings and errors
archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn('Warning:', err);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files to the archive
const srcDir = path.join(__dirname, '..');
const files = [
  'manifest.json',
  'README.md',
  'src/popup.html',
  'src/popup.css',
  'src/popup.js',
  'src/content.js',
  'src/background.js',
  'src/welcome.html',
  'assets/icon16.png',
  'assets/icon48.png',
  'assets/icon128.png'
];

files.forEach(file => {
  const filePath = path.join(srcDir, file);
  if (fs.existsSync(filePath)) {
    archive.file(filePath, { name: file });
  } else {
    console.warn(`Warning: File ${file} not found`);
  }
});

// Finalize the archive
archive.finalize(); 