/**
 * NIGHTSTEM QUALITY CHECK CORE
 * Reusable quality assurance module for both pre-commit hooks and manual checks
 * Supports staged files and full codebase modes
 */

import { execSync } from 'child_process';
import { Listr } from 'listr2';

// Nightstem Brand Colors
export const colors = {
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
 * Build tasks based on mode
 * @param {string} mode - 'staged' or 'full'
 * @param {string[]} stagedFiles - Array of staged files (used in staged mode)
 * @returns {Array} Array of task definitions
 */
function buildTasks(mode, stagedFiles) {
  const isStaged = mode === 'staged';

  return [
    {
      title: 'Formatting Check (Prettier)',
      task: async (ctx, task) => {
        const start = Date.now();
        try {
          let command;
          if (isStaged) {
            command = `echo "${stagedFiles.join('\n')}" | xargs pnpm exec prettier --write --ignore-unknown`;
          } else {
            command = 'pnpm prettier:check';
          }
          execSync(command, { stdio: 'pipe' });
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
            `Formatting check failed [${Math.round(ctx.prettierTime / 1000)}s]`,
          );
        }
      },
    },
    {
      title: 'Type Checking (TypeScript)',
      skip: () => {
        if (isStaged) {
          const tsFiles = filterFiles(stagedFiles, ['.ts', '.tsx']);
          return tsFiles.length === 0;
        }
        return false;
      },
      task: async (ctx, task) => {
        const start = Date.now();
        try {
          let command;
          if (isStaged) {
            command = 'pnpm lint:ts --incremental';
          } else {
            command = 'pnpm lint:ts';
          }
          execSync(command, { stdio: 'pipe' });
          ctx.tsTime = Date.now() - start;
          if (isStaged) {
            const tsFiles = filterFiles(stagedFiles, ['.ts', '.tsx']);
            task.title += ` ${colors.primary}✓${colors.reset} [${tsFiles.length} file(s), ${Math.round(ctx.tsTime / 1000)}s]`;
          } else {
            task.title += ` ${colors.primary}✓${colors.reset} [${Math.round(ctx.tsTime / 1000)}s]`;
          }
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
      skip: () => {
        if (isStaged) {
          const jsFiles = filterFiles(stagedFiles, [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
          ]);
          return jsFiles.length === 0;
        }
        return false;
      },
      task: async (ctx, task) => {
        const start = Date.now();
        try {
          let command;
          if (isStaged) {
            const jsFiles = filterFiles(stagedFiles, [
              '.js',
              '.jsx',
              '.ts',
              '.tsx',
            ]);
            command = `echo "${jsFiles.join('\n')}" | xargs pnpm exec eslint --fix --max-warnings 0`;
          } else {
            command = 'pnpm lint';
          }
          execSync(command, { stdio: 'pipe' });
          ctx.lintTime = Date.now() - start;
          if (isStaged) {
            const jsFiles = filterFiles(stagedFiles, [
              '.js',
              '.jsx',
              '.ts',
              '.tsx',
            ]);
            task.title += ` ${colors.primary}✓${colors.reset} [${jsFiles.length} file(s), ${Math.round(ctx.lintTime / 1000)}s]`;
          } else {
            task.title += ` ${colors.primary}✓${colors.reset} [${Math.round(ctx.lintTime / 1000)}s]`;
          }
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
      skip: () => {
        if (isStaged) {
          const jsFiles = filterFiles(stagedFiles, [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
          ]);
          return jsFiles.length === 0;
        }
        return false;
      },
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
  ];
}

/**
 * Execute quality checks
 * @param {Object} options - Configuration object
 * @param {string} options.mode - 'staged' or 'full'
 * @param {string} options.banner - Banner text to display
 * @param {Function} options.onSuccess - Callback on success
 * @param {Function} options.onFailure - Callback on failure
 */
export async function runQualityChecks(options) {
  const {
    mode = 'full',
    banner = '',
    onSuccess = () => {},
    onFailure = () => {},
  } = options;

  const isStaged = mode === 'staged';
  const stagedFiles = isStaged ? getStagedFiles() : [];
  const totalFiles = stagedFiles.length;

  console.log(banner);

  // Pre-check validations for staged mode
  if (isStaged && totalFiles === 0) {
    console.log(
      `${colors.primaryLight}No staged files detected. Skipping checks.${colors.reset}\n`,
    );
    process.exit(0);
  }

  if (isStaged) {
    console.log(
      `${colors.primaryLight}Processing ${totalFiles} file(s)${colors.reset}\n`,
    );
  }

  // Build and execute tasks
  const tasks = new Listr(buildTasks(mode, stagedFiles), {
    concurrent: false,
    exitOnError: true,
    renderer: 'default',
  });

  try {
    const context = await tasks.run();

    // Calculate total time
    const totalTime =
      (context.prettierTime || 0) +
      (context.tsTime || 0) +
      (context.lintTime || 0) +
      (context.testTime || 0);

    // Call success callback
    onSuccess({ totalTime, totalFiles, context });

    process.exit(0);
  } catch (error) {
    // Call failure callback
    onFailure({ totalFiles, error });

    process.exit(1);
  }
}
