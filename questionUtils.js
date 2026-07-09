(function (global) {
  function createQuestionDeck(questions) {
    return [...questions].sort(() => Math.random() - 0.5);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createQuestionDeck };
  }

  global.createQuestionDeck = createQuestionDeck;
})(typeof window !== 'undefined' ? window : globalThis);
