import { checkWordInSentence } from './checks';

test('checkWordInSentence test', () => {
    const testClass = 'px-0 py-1 focuspypx focus-within:px-3 ';
    expect(checkWordInSentence(testClass, 'px')).toBeTruthy();
    expect(checkWordInSentence(testClass, 'py')).toBeTruthy();
    expect(checkWordInSentence(testClass, 'pt')).toBeFalsy();
});
