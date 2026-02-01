import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

const TASKS = [
  {
    name: 'React',
    url: 'https://raw.githubusercontent.com/mingcute-design/mingcute-docs/main/readme/react/README.md',
    dest: path.join(ROOT_DIR, 'packages/mingcute-react/README.md'),
  },
  {
    name: 'Vue',
    url: 'https://raw.githubusercontent.com/mingcute-design/mingcute-docs/main/readme/vue/README.md',
    dest: path.join(ROOT_DIR, 'packages/mingcute-vue/README.md'),
  },
];

async function fetchAndWrite(task) {
  try {
    console.log(`Fetching ${task.name} README...`);
    const response = await fetch(task.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${task.url}: ${response.statusText}`);
    }
    
    let content = await response.text();
    
    // Replace relative image paths with absolute URLs
    content = content.replace(
      /src="\.\.\/\.\.\/images\//g, 
      'src="https://raw.githubusercontent.com/mingcute-design/mingcute-docs/main/images/'
    );

    await fs.writeFile(task.dest, content);
    console.log(`Successfully wrote to ${task.dest}`);
  } catch (error) {
    console.error(`Error processing ${task.name}:`, error);
    process.exit(1);
  }
}

async function main() {
  await Promise.all(TASKS.map(fetchAndWrite));
  console.log('All READMEs synced successfully!');
}

main();
