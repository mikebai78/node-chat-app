const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'server';
    let text = 'this is test text';
    let message = generateMessage(from, text);
      expect(message.from).toBe(from);
      expect(message.text).toBe(text);
      expect(typeof message.createdAt).toBe('number');
    })
  });

describe('generateLocationMessage', () => {
  it('should generate correct location object', ()=>{
    let from = 'friend';
    let latitude = 123456;
    let longitude = 654321;
    let locationMessage = generateLocationMessage(from, latitude, longitude);

    expect(typeof message.createdAt).toBe('number');
    expect(locationMessage.from).toBe(from);
    expect(locationMessage.url).toBe('https://www.google.com/maps?='+latitude+','+longitude);
  })
})
