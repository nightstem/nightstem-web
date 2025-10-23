#!/usr/bin/env node

/**
 * NIGHTSTEM FULL CODEBASE QUALITY CHECK
 * Run with: pnpm quality
 * Checks entire codebase for formatting, types, lint, and tests
 */

import { colors, runQualityChecks } from './quality-check-core.js';

// Banner
const banner = `
${colors.primary}${colors.bold}✦ NIGHTSTEM FULL CODEBASE QUALITY CHECK ✦${colors.reset}
${colors.primaryLight}Comprehensive Code Quality Analysis${colors.reset}
`;

// Run quality checks
runQualityChecks({
  mode: 'full',
  banner,
  onSuccess: ({ totalTime }) => {
    // Summary
    console.log(
      `\n${colors.primary}${colors.bold}✦ ALL CHECKS PASSED ✦${colors.reset}`,
    );
    console.log(`${colors.primary}✓ Codebase quality verified${colors.reset}`);
    console.log(
      `${colors.primaryLight}Total: ${Math.round(totalTime / 1000)}s${colors.reset}\n`,
    );
  },
  onFailure: () => {
    // Summary with failures
    console.log(
      `\n${colors.red}${colors.bold}✗ VERIFICATION FAILED ✗${colors.reset}`,
    );
    console.log(`${colors.red}✗ Fix issues above${colors.reset}`);
    console.log(
      `${colors.red}\nFix the issues above and re-run the quality check.\n${colors.reset}`,
    );
  },
});
