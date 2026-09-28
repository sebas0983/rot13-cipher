import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rot13 } from '../src/index.js';

test('rot13 shifts lowercase letters by 13 positions', () => {
  assert.equal(rot13('hello'), 'uryyb');
});

test('rot13 shifts uppercase letters by 13 positions', () => {
  assert.equal(rot13('HELLO'), 'URYYB');
});

test('rot13 is its own inverse — applying twice restores the original', () => {
  const original = 'The quick brown fox jumps over the lazy dog.';
  assert.equal(rot13(rot13(original)), original);
});

test('rot13 preserves mixed case within a single string', () => {
  assert.equal(rot13('Hello, World!'), 'Uryyb, Jbeyq!');
});

test('rot13 leaves digits unchanged', () => {
  assert.equal(rot13('0123456789'), '0123456789');
});

test('rot13 leaves punctuation and whitespace unchanged', () => {
  assert.equal(rot13('!@#$%^&*()\n\t '), '!@#$%^&*()\n\t ');
});

test('rot13 wraps around the end of the alphabet', () => {
  // 'n' is the 14th letter (index 13); shifting by 13 lands on 'a'.
  assert.equal(rot13('nopqrstuvwxyz'), 'abcdefghijklm');
});

test('rot13 wraps uppercase letters around the end of the alphabet', () => {
  assert.equal(rot13('NOPQRSTUVWXYZ'), 'ABCDEFGHIJKLM');
});

test('rot13 returns an empty string for empty input', () => {
  assert.equal(rot13(''), '');
});

test('rot13 coerces non-string input to a string', () => {
  assert.equal(rot13(42), '42');
  assert.equal(rot13(null), 'ahyy');
  assert.equal(rot13(true), 'gehr');
});

test('rot13 passes through non-ASCII characters unchanged', () => {
  assert.equal(rot13('café — naïve'), 'pnsé — anïir');
});

test('rot13 preserves emoji as intact code points', () => {
  // U+1F600 (😀) is outside the BMP and requires a surrogate pair in UTF-16.
  // Iterating by code point keeps it as a single character.
  assert.equal(rot13('a😀b'), 'n😀o');
});
