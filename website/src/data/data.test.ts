import Data from './data';
import TransliteratedLowercase from '../../converted-json-files/transliterated_lowercase.json';

describe('Data Singleton Class', () => {
  it('should return the same instance', () => {
    const instance1 = Data.getInstance();
    const instance2 = Data.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should return transliteratedLowercase data', () => {
    const instance = Data.getInstance();
    expect(instance.transliteratedLowercase).toBe(TransliteratedLowercase);
  });
});