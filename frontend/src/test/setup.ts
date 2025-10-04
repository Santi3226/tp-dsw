import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

/*
# Test unitario (con Vitest)
pnpm test MinimapaCentros

# Test E2E (con Playwright)
con front y back andando
pnpm test:e2e
*/