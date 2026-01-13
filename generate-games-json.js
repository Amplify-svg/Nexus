const fs = require('fs').promises;
const path = require('path');

// List of folders to ignore (optional)
const IGNORED = ['node_modules', '.git', '.vscode'];

// Output file
const OUTPUT = 'games.json';

// Function to capitalize game labels nicely
function formatLabel(filename) {
  let name = filename.replace('.html', '');

  // Convert to lowercase to check if it starts with 'cl'
  if (name.substring(0, 2).toLowerCase() === 'cl') {
    name = name.slice(2); // Remove the first 2 characters
  }

  // Trim any accidental leftover underscores or spaces
  name = name.replace(/^[_\s]+/, '');

  // Replace underscores with spaces and capitalize each word
  return name
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

// Main function
async function generateGameList() {
  const entries = await fs.readdir('.', { withFileTypes: true });
  const folders = entries.filter(
    (entry) => entry.isDirectory() && !IGNORED.includes(entry.name)
  );

  const games = [];

  for (const folder of folders) {
    const files = await fs.readdir(folder.name);
    for (const file of files) {
      if (file.endsWith('.html')) {
        games.push({
          label: formatLabel(file),
          path: `${folder.name}/${file}`
        });
      }
    }
  }

  // ✅ Sort games alphabetically by label
  games.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));

  await fs.writeFile(OUTPUT, JSON.stringify(games, null, 2));
  console.log(`✅ ${OUTPUT} generated with ${games.length} games (alphabetically sorted).`);
}

generateGameList();
