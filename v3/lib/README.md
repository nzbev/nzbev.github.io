# Third-party libraries

Vendored copies, used only by `sumup.html` (QR setup).

| File | Library | Version | License | Source |
|---|---|---|---|---|
| `qrcode.js` | qrcode-generator (Kazuhiko Arase) | 1.4.4 | MIT, see `LICENSE-qrcode-generator.txt` | https://github.com/kazuhikoarase/qrcode-generator |
| `jsQR.js` | jsQR (Cosmo Wolfe) | 1.4.0 | Apache-2.0, see `LICENSE-jsQR.txt` | https://github.com/cozmo/jsQR |

`qrcode.js` is unmodified. `jsQR.js` is `dist/jsQR.js` from the npm package, unmodified except for
one added header comment line (name, version, license). jsQR ships no NOTICE file.
