const MarkovMachine = require('./markov');

describe('MarkovMachine', () => {
  test('should generate text based on the input text', () => {
    const text = 'the cat in the hat is in the hat';
    const markovMachine = new MarkovMachine(text);
    const generatedText = markovMachine.makeText(5); 

    expect(typeof generatedText).toBe('string');
    expect(generatedText.trim()).not.toBe('');
  });

  test('should handle an empty input', () => {
    const markovMachine = new MarkovMachine('');
    const generatedText = markovMachine.makeText();

    expect(typeof generatedText).toBe('string');
    expect(generatedText.trim()).toBe('');
  });

  test('should handle input with only one word', () => {
    const text = 'hello';
    const markovMachine = new MarkovMachine(text);
    const generatedText = markovMachine.makeText(3);

    expect(generatedText.trim()).toBe(text);
  });
});
