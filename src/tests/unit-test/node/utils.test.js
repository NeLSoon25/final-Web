import { ConvertirCapitalize } from '../../../utils/Conversiones';

describe('ConvertirCapitalize function test', () => {
  const answer = 'Hello_123';
  it('already capitalized word', () => {
    const word = 'Hello_123';
    const capitalize = ConvertirCapitalize(word);
    expect(capitalize).toBe(answer);
  });

  it('Uppercase word', () => {
    const word = 'HELLO_123';
    const capitalize = ConvertirCapitalize(word);
    expect(capitalize).toBe(answer);
  });

  it('lowercase word', () => {
    const word = 'hello_123';
    const capitalize = ConvertirCapitalize(word);
    expect(capitalize).toBe(answer);
  });

  it('!capitalized_word', () => {
    const word = 'hELLO_123';
    const capitalize = ConvertirCapitalize(word);
    expect(capitalize).toBe(answer);
  });
});