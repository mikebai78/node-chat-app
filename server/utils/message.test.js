const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'server';
    let text = 'this is test text';
    let message = generateMessage(from, text);
      expect(message.from).toBe(from);
      expect(message.text).toBe(text);
      expect(typeof message.createdAt).toBe('number');
    })
  })
