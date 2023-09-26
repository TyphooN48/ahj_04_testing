import CardValidator from '../CardValidator';

test.each([
  ['true for valid card', '5555555555554444', true],
  ['false for invalid card', '555555555555444', false],
])(('it should be %s'), (_, input, expected) => {
  expect(CardValidator.isValid(input)).toBe(expected);
});

test.each([
  ['return card type', '4111111111111111', 'visa'],
  ['return card type', '5555555555554444', 'master'],
  ['return card type', '6759416504627850', 'maestro'],
  ['return card type', '2201382000000013', 'mir'],
  ['return card type', '38', null],
])(('it should be %s'), (_, input, expected) => {
  const validator = new CardValidator();
  expect(validator.paySystem(input)).toBe(expected);
});
