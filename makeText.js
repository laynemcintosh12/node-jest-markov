const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');

function readTextFromFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`Error reading file '${filePath}':`);
    console.error(err.message);
    process.exit(1);
  }
}

async function readTextFromURL(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(`Error fetching URL '${url}':`);
    console.error(err.message);
    process.exit(1);
  }
}

function generateText(text, numWords) {
  const markovMachine = new MarkovMachine(text);
  return markovMachine.makeText(numWords);
}

const inputType = process.argv[2];
const inputPath = process.argv[3];
const numWords = process.argv[4] || 100;

if (!inputType || !inputPath) {
  console.error('Usage: node makeText.js [file|url] [path] [numWords]');
  process.exit(1);
}

if (inputType === 'file') {
  const text = readTextFromFile(inputPath);
  const generatedText = generateText(text, numWords);
  console.log(generatedText);
} else if (inputType === 'url') {
  readTextFromURL(inputPath)
    .then((text) => {
      const generatedText = generateText(text, numWords);
      console.log(generatedText);
    });
} else {
  console.error('Invalid input type. Use "file" or "url".');
  process.exit(1);
}
