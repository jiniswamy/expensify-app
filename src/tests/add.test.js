const add = (a, b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}`;

test('should add two numbers', () => {
  const result = add(3, 4);
  expect(result).toBe(7);
});

test('Perform greeting', () => {
  expect(generateGreeting('Ranjini')).toBe('Hello Ranjini');
});

test('Perform anonymous greeting',() => {

  expect(generateGreeting()).toBe('Hello Anonymous');
});
