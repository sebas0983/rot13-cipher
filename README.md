# ROT13 Cipher

Applies the ROT13 letter-shift cipher to a string: each ASCII letter is moved 13 positions through the alphabet, with case preserved. All other characters pass through unchanged. Because the alphabet has 26 letters, calling `rot13` twice returns the original text.

```js
import { rot13 } from 'rot13-cipher';

const obfuscated = rot13('Hello, World!'); // 'Uryyb, Jbeyq!'
const restored = rot13(obfuscated);        // 'Hello, World!'
```

## Why this exists

ROT13 is a toy cipher — it provides no real security. It is still useful as a lightweight way to hide spoilers, punchlines, or puzzle answers from casual glance. This library gives you a single, dependency-free function with predictable behaviour rather than a general-purpose substitution-cipher framework.

The trade-off: only the 52 ASCII letters `A–Z` and `a–z` are shifted. Everything else — digits, punctuation, whitespace, accented letters, emoji — is returned verbatim. If you need to shift digits or handle locale-specific letters, this is not the right tool.

## Edge cases

- Non-string inputs are coerced with `String(value)`, so `rot13(42)` returns `'42'` rather than throwing.
- Characters outside the Basic Multilingual Plane (e.g. emoji) are iterated as whole code points and left untouched.

## Exports

- `rot13(input: string): string` — the single function this library provides.
