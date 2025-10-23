#!/usr/bin/env node

/**
 * NIGHTSTEM PRE-COMMIT HOOK v3.0
 * Professional Commit Quality Assurance System
 * Uses shared quality-check-core module for consistency
 */

import { colors, runQualityChecks } from '../scripts/quality-check-core.js';

// Banner
const banner = `
${colors.primary}${colors.bold}✦ NIGHTSTEM PRE-COMMIT VERIFICATION ✦${colors.reset}
${colors.primaryLight}Ensuring Code Quality Before Commit${colors.reset}
`;

// Run quality checks
runQualityChecks({
  mode: 'staged',
  banner,
  onSuccess: ({ totalTime, totalFiles }) => {
    // Summary
    console.log(
      `\n${colors.primary}${colors.bold}✦ ALL CHECKS PASSED ✦${colors.reset}`,
    );
    console.log(`${colors.primary}✓ Ready to commit${colors.reset}`);
    console.log(
      `${colors.primaryLight}Total: ${Math.round(totalTime / 1000)}s  │  ${totalFiles} files  │  All passed${colors.reset}\n`,
    );
  },
  onFailure: ({ totalFiles }) => {
    // Summary with failures
    console.log(
      `\n${colors.red}${colors.bold}✗ VERIFICATION FAILED ✗${colors.reset}`,
    );
    console.log(`${colors.red}✗ Fix issues above${colors.reset}`);
    console.log(
      `${colors.primaryLight}${totalFiles} files processed${colors.reset}`,
    );
    console.log(
      `${colors.red}\nYour changes remain staged. Re-run 'git commit' after fixing issues.\n${colors.reset}`,
    );
  },
});
