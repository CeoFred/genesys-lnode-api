const { generateRandomString,formatObject } = require('../lib/helper.js');


test('Should generate random String', () => {
  expect(generateRandomString(2)).toBeTruthy();
})

test('Should format object', () => {
  expect(formatObject({a:1},{a:2})).toEqual({a:2});
})

test('Should fail to format object', () => {
  expect(formatObject({a:1},{a:2})).not.toEqual({a:6});
})
