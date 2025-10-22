#!/usr/bin/env node

/**
 * NIGHTSTEM PRE-COMMIT HOOK v3.0
 * Professional Commit Quality Assurance System
 * Built with listr2 for beautiful, reliable task execution
 */

import { execSync } from 'child_process';
import { Listr } from 'listr2';

// Nightstem Brand Colors
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  // Brand colors
  primary: '\x1b[38;2;16;184;128m', // Nightstem Primary Green (#10b880)
  secondary: '\x1b[38;2;219;150;0m', // Nightstem Secondary Orange (#db9600)
  primaryLight: '\x1b[38;2;117;220;172m', // Light Primary (#75dcac)
  // Standard colors for clarity
  red: '\x1b[31m',
  white: '\x1b[37m',
};

// Banner
const banner = `
${colors.primary}${colors.bold}✦ NIGHTSTEM PRE-COMMIT VERIFICATION ✦${colors.reset}
${colors.primaryLight}Ensuring Code Quality Before Commit${colors.reset}
`;

/**
 * Get staged files from git
 */
function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=d', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    return output ? output.split('\n').filter(Boolean) : [];
  } catch {
    return [];
  }
}

/**
 * Filter files by extension
 */
function filterFiles(files, extensions) {
  return files.filter((file) => extensions.some((ext) => file.endsWith(ext)));
}

/**
 * Main hook execution
 */
async function main() {
  console.log(banner);

  const stagedFiles = getStagedFiles();
  const totalFiles = stagedFiles.length;

  if (totalFiles === 0) {
    console.log(
      `${colors.primaryLight}No staged files detected. Skipping checks.${colors.reset}\n`,
    );
    process.exit(0);
  }

  console.log(
    `${colors.primaryLight}Processing ${totalFiles} file(s)${colors.reset}\n`,
  );

  // Filter files by type
  const tsFiles = filterFiles(stagedFiles, ['.ts', '.tsx']);
  const jsFiles = filterFiles(stagedFiles, ['.js', '.jsx', '.ts', '.tsx']);

  // Build tasks
  const tasks = new Listr(
    [
      {
        title: 'Formatting Check (Prettier)',
        task: async (ctx, task) => {
          const start = Date.now();
          try {
            execSync(
              `echo "${stagedFiles.join('\n')}" | xargs pnpm exec prettier --write --ignore-unknown`,
              { stdio: 'pipe' },
            );
            ctx.prettierTime = Date.now() - start;
            task.title += ` ${colors.primary}✓${colors.reset} [${Math.round(ctx.prettierTime / 1000)}s]`;
          } catch (error) {
            ctx.prettierTime = Date.now() - start;
            const errorOutput =
              error.stdout?.toString() ||
              error.stderr?.toString() ||
              error.message;
            if (errorOutput) {
              console.log(`\n${colors.red}${errorOutput}${colors.reset}`);
            }
            throw new Error(
              `Formatting failed [${Math.round(ctx.prettierTime / 1000)}s]`,
            );
          }
        },
      },
      {
        title: 'Type Checking (TypeScript)',
        skip: () => tsFiles.length === 0,
        task: async (ctx, task) => {
          const start = Date.now();
          try {
            execSync('pnpm lint:ts --incremental', { stdio: 'pipe' });
            ctx.tsTime = Date.now() - start;
            task.title += ` ${colors.primary}✓${colors.reset} [${tsFiles.length} file(s), ${Math.round(ctx.tsTime / 1000)}s]`;
          } catch (error) {
            ctx.tsTime = Date.now() - start;
            const errorOutput =
              error.stdout?.toString() ||
              error.stderr?.toString() ||
              error.message;
            if (errorOutput) {
              console.log(`\n${colors.red}${errorOutput}${colors.reset}`);
            }
            throw new Error(
              `Type errors detected [${Math.round(ctx.tsTime / 1000)}s]`,
            );
          }
        },
      },
      {
        title: 'Linting Check (ESLint)',
        skip: () => jsFiles.length === 0,
        task: async (ctx, task) => {
          const start = Date.now();
          try {
            execSync(
              `echo "${jsFiles.join('\n')}" | xargs pnpm exec eslint --fix --max-warnings 0`,
              { stdio: 'pipe' },
            );
            ctx.lintTime = Date.now() - start;
            task.title += ` ${colors.primary}✓${colors.reset} [${jsFiles.length} file(s), ${Math.round(ctx.lintTime / 1000)}s]`;
          } catch (error) {
            ctx.lintTime = Date.now() - start;
            const errorOutput =
              error.stdout?.toString() ||
              error.stderr?.toString() ||
              error.message;
            if (errorOutput) {
              console.log(`\n${colors.red}${errorOutput}${colors.reset}`);
            }
            throw new Error(
              `Lint violations found [${Math.round(ctx.lintTime / 1000)}s]`,
            );
          }
        },
      },
      {
        title: 'Test Suite (Vitest)',
        skip: () => jsFiles.length === 0,
        task: async (ctx, task) => {
          const start = Date.now();
          try {
            execSync('pnpm test', { stdio: 'pipe' });
            ctx.testTime = Date.now() - start;
            task.title += ` ${colors.primary}✓${colors.reset} [${Math.round(ctx.testTime / 1000)}s]`;
          } catch (error) {
            ctx.testTime = Date.now() - start;
            const errorOutput =
              error.stdout?.toString() ||
              error.stderr?.toString() ||
              error.message;
            if (errorOutput) {
              console.log(`\n${colors.red}${errorOutput}${colors.reset}`);
            }
            throw new Error(
              `Test failures detected [${Math.round(ctx.testTime / 1000)}s]`,
            );
          }
        },
      },
    ],
    {
      concurrent: false,
      exitOnError: true,
      renderer: 'default',
    },
  );

  try {
    const context = await tasks.run();

    // Calculate total time
    const totalTime =
      (context.prettierTime || 0) +
      (context.tsTime || 0) +
      (context.lintTime || 0) +
      (context.testTime || 0);

    // Summary
    console.log(
      `\n${colors.primary}${colors.bold}✦ ALL CHECKS PASSED ✦${colors.reset}`,
    );
    console.log(`${colors.primary}✓ Ready to commit${colors.reset}`);
    console.log(
      `${colors.primaryLight}Total: ${Math.round(totalTime / 1000)}s  │  ${totalFiles} files  │  All passed${colors.reset}\n`,
    );

    process.exit(0);
  } catch (error) {
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

    process.exit(1);
  }
}

main().catch(() => process.exit(1));
