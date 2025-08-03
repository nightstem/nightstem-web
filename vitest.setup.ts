import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';

import * as matchers from 'vitest-axe/matchers';
import { expect, vi } from 'vitest';

import { loadEnvConfig } from '@next/env';

expect.extend(matchers);

const projectDir = process.cwd();
loadEnvConfig(projectDir);
