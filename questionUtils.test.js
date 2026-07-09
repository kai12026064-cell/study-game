const test = require('node:test');
const assert = require('node:assert/strict');
const { createQuestionDeck } = require('./questionUtils');

test('createQuestionDeck returns a shuffled copy of the questions', () => {
  const questions = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const deck = createQuestionDeck(questions);

  assert.equal(deck.length, questions.length);
  assert.deepEqual(deck.map((q) => q.id).sort(), [1, 2, 3]);
  assert.notStrictEqual(deck, questions);
});
