/** Textual markov chain generator */


class MarkovMachine {

    /** build markov machine; read in text.*/
  
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.makeChains();
    }
  
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  
    makeChains() {
        this.chain = {};

        for (let i = 0; i < this.words.length; i++) {
          const word = this.words[i];
          const nextWord = this.words[i + 1] || null;
    
          if (!this.chain[word]) {
            this.chain[word] = [];
          }
    
          this.chain[word].push(nextWord);
        }
    }
  
    getRandomWord() {
        const words = Object.keys(this.chain);
        return words[Math.floor(Math.random() * words.length)];
    }
  
    /** return random text from chains */
  
    makeText(numWords = 100) {
        let text = [];
        let currentWord = this.getRandomWord();
    
        while (text.length < numWords) {
          text.push(currentWord);
          const nextWords = this.chain[currentWord];
          if (!nextWords || nextWords.length === 0) break;
          currentWord = nextWords[Math.floor(Math.random() * nextWords.length)];
        }
    
        return text.join(' ');
    }
  }

module.exports = MarkovMachine;