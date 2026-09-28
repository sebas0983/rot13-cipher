/**
 * Apply the ROT13 cipher to a string.
 *
 * ROT13 shifts each ASCII letter by 13 positions. Because the English
 * alphabet has 26 letters, applying the transform twice restores the
 * original text — encryption and decryption are the same operation.
 *
 * Design decisions:
 *
 * - Only the 52 ASCII letters A–Z and a–z are shifted. Digits, punctuation,
 *   whitespace, and all other code points are passed through unchanged.
 *   The brief says "letter replacement cipher," so we touch letters only.
 *
 * - Case is preserved independently: uppercase stays uppercase, lowercase
 *   stays lowercase. We branch on the code-point range rather than using
 *   a lookup table so there is nothing to keep in sync.
 *
 * - The input is coerced to a string with String(value). This mirrors the
 *   behaviour of built-ins like String.prototype.repeat and gives a
 *   predictable result for numbers, booleans, and null. A deliberate
 *   choice is made to accept anything rather than throw on non-strings;
 *   callers who want strict typing can layer that on top.
 *
 * - We iterate over code points with a for…of loop so that characters
 *   outside the Basic Multilingual Plane (e.g. emoji) are treated as
 *   single units and passed through intact. Splitting on UTF-16 code units
 *   would break surrogate pairs.
 *
 * @param {string} input - The text to transform.
 * @returns {string} The transformed text.
 */
export function rot13(input) {
  const text = String(input);
  let out = '';
  for (const ch of text) {
    const code = ch.codePointAt(0);
    if (code >= 65 && code <= 90) {
      // Uppercase A–Z: wrap within [65, 90].
      out += String.fromCodePoint(65 + ((code - 65 + 13) % 26));
    } else if (code >= 97 && code <= 122) {
      // Lowercase a–z: wrap within [97, 122].
      out += String.fromCodePoint(97 + ((code - 97 + 13) % 26));
    } else {
      out += ch;
    }
  }
  return out;
}
