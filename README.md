# Nightstem

A modern web application built with Next.js 15, featuring a comprehensive design system, robust testing framework, and advanced feature management capabilities.

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Runtime**: React 19 + TypeScript
- **Styling**: TailwindCSS 4.x with custom design tokens
- **Testing**: Vitest + React Testing Library + Playwright
- **Documentation**: Storybook 9
- **Feature Flags**: GrowthBook integration
- **Package Manager**: PNPM with workspace configuration
- **Fonts**: Inter Variable (via Fontsource)
- **Analytics**: Microsoft Clarity + Umami integration

## 🏁 Quick Start

### Prerequisites

- [Node.js 22.19.0+](https://nodejs.org/en/download/) (required)
- [PNPM 10.17.0+](https://pnpm.io/installation) (required package manager)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd site

# Install dependencies
pnpm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your configuration

# Start development server
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Feature Flags (GrowthBook)
NEXT_PUBLIC_FEATURE_FLAG_HOST="https://cdn.growthbook.io"
NEXT_PUBLIC_FEATURE_FLAG_CLIENT_KEY="your-growthbook-client-key"

# Analytics (Umami)
NEXT_PUBLIC_UMAMI_WEBSITE_ID="your-umami-website-id"

# Add other environment variables as needed
```

## 📜 Available Scripts

### Development

- `pnpm dev` - Start development server on <http://localhost:3000>
- `pnpm build` - Build production static export
- `pnpm start` - Start production server

### Testing & Quality

- `pnpm test` - Run tests once with Vitest
- `pnpm test:watch` - Run tests in watch mode
- `pnpm coverage` - Generate test coverage report (80% coverage threshold enforced)
- `pnpm lint` - Run ESLint
- `pnpm lint:ts` - Run TypeScript type checking
- `pnpm prettier:check` - Check code formatting
- `pnpm prettier:write` - Format code
- `pnpm quality` - Run full quality check (format, types, lint, tests, coverage)
- `pnpm clean` - Clean build artifacts and node_modules

### Storybook

- `pnpm storybook` - Start Storybook dev server on port 6006
- `pnpm build-storybook` - Build Storybook for production

## 🏗️ Project Structure

```sh
src/
├── app/                   # Next.js App Router pages
├── components/            # Reusable UI components
│   ├── ui/                # Core UI components
│   └── layout/            # Layout components
├── contexts/              # React contexts
├── screens/               # Page-level components
├── utils/                 # Utility functions
└── assets/                # Static assets (SVGs, images)
```

### Component Architecture

Each component follows a consistent structure:

```sh
ComponentName/
├── ComponentName.tsx         # Main component
├── ComponentName.test.tsx    # Test file
├── ComponentName.stories.tsx # Storybook stories
├── types.ts                  # TypeScript types
├── constants.ts              # Component constants
├── themes.ts                 # Theming configuration
└── index.ts                  # Barrel export
```

## 🧪 Testing Strategy

- **Framework**: Vitest with jsdom environment
- **Library**: React Testing Library for component testing
- **Coverage**: 80% test coverage threshold enforced per file
- **Accessibility**: Automated a11y testing with vitest-axe
- **Snapshots**: Comprehensive snapshot testing for UI consistency
- **Timeout**: 10s test timeout for reliable CI/CD

## 🎨 Design System

### Styling Approach

- **TailwindCSS 4.x** with custom configuration
- **CSS Variables** for design tokens and theming
- **Classnames utility** for conditional styling
- **Systematic color palette**: primary, secondary, and neutral variants

### Component Theming

Components use centralized theme configuration via `themes.ts` files, ensuring consistency across the design system.

## 📖 Storybook

Interactive component documentation and development environment:

- **Development**: `pnpm storybook` (<http://localhost:6006>)
- **Features**: Component playground, accessibility testing, responsive testing
- **Documentation**: Auto-generated docs from component props and JSDoc

## 🚀 Deployment

This application is configured for **Cloudflare Pages** deployment via GitHub Actions:

- **Static Export**: Next.js configured for static generation
- **Build Command**: `pnpm build`
- **Output Directory**: `out/`
- **Environment Variables**: Configure as GitHub repository variables in Settings → Environments → [environment] → Environment variables:
  - `NEXT_PUBLIC_FEATURE_FLAG_HOST`
  - `NEXT_PUBLIC_FEATURE_FLAG_CLIENT_KEY`
  - `NEXT_PUBLIC_UMAMI_WEBSITE_ID`

### Deployment Environments

- **Production**: Deploys from `main` branch via manual workflow dispatch
- **Staging**: Deploys automatically on pull requests for preview

## 🤝 Contributing

### Development Workflow

1. **Setup**: Follow the Quick Start guide
2. **Development**: Use `pnpm dev` for development server
3. **Testing**: Ensure `pnpm test` and `pnpm coverage` pass (80% coverage threshold required)
4. **Quality**: Run `pnpm lint` and `pnpm lint:ts` before committing
5. **Storybook**: Document new components with stories

### Code Standards

- **TypeScript**: Strict mode enabled throughout
- **Testing**: Every component must have comprehensive tests
- **Accessibility**: Components must pass a11y audits
- **Formatting**: Prettier for consistent code formatting
- **Git Hooks**: Husky configured for pre-commit quality checks

### Feature Flags

The application uses GrowthBook for feature flag management:

- Configure flags in your GrowthBook dashboard
- Use the `FeatureFlagContext` to access feature flags in components
- Environment-based flag configuration via `.env.local`

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
