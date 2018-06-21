const expect = require('expect');
const {isRealString} = require('./validation');

describe('validation', () => {
  it('should allow string value', () => {
    let str = 'test';
    let res = isRealString(str);
      expect(res).toBe(true);
    });

  it('should reject string with only space', () => {
    let str = '   ';
    let res = isRealString(str);
      expect(res).toBe(false);
    });

  it('should reject non-string value', () => {
    let str = '';
    let res = isRealString(str);
      expect(res).toBe(false);
    })
  });
