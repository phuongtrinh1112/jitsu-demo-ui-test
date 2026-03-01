# Playwright Setup & Troubleshooting

## ✅ Completed Setup

Playwright with Chrome and Firefox browsers is now configured and working.

### Available Test Commands

```bash
# Run all tests (chromium + firefox)
npm test

# Run chromium only
npm run test:chromium

# Run firefox only  
npm run test:firefox

# Run with browser visible (headed mode)
npm run test:headed

# Debug mode (interactive)
npm run test:debug

# View HTML test report
npx playwright show-report
```

## Network/SSL Issues Fixed

### Issue: `self-signed certificate in certificate chain`

**Cause:** Behind a corporate proxy/firewall that intercepts HTTPS with self-signed certificates.

**Solution:** Environment variable `NODE_TLS_REJECT_AUTHORIZED=0` is automatically set by npm scripts.

If running Playwright commands directly (not via npm scripts), set it manually:

```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0
npx playwright install  # (if reinstalling browsers)
npx playwright test     # run tests
```

### Browsers Installed

- ✅ Chromium v1208 (Chrome for Testing v145.0.7632.6)
- ✅ Firefox v1509 (v146.0.1)
- ⚠️ WebKit not available on macOS 13 ARM64

## Project Structure

```
jitsu-demo-ui-test/
├── tests/
│   └── example.spec.ts       # Test file
├── playwright.config.ts      # Playwright configuration
├── package.json             # Dependencies & npm scripts
└── .env.example             # SSL environment config reference
```

## Next Steps

1. Update test files in `tests/` with your test cases
2. Configure `playwright.config.ts` with your app's baseURL and other settings
3. Run tests with `npm test`

## References

- [Playwright Documentation](https://playwright.dev)
- [Test Configuration](https://playwright.dev/docs/test-configuration)
- [Debugging Tests](https://playwright.dev/docs/debug)
