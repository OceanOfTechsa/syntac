# SYNTAC Website - Next.js

This repository contains the official website of **SYNTAC**, built with Next.js and deployed on Vercel. It showcases our services, case studies, technologies, how we work, and contact information.

## 🚀 Getting Started

### Prerequisites

- Node.js 24 (the version used by our CI workflows)
- npm, yarn, pnpm, or bun package manager

### Local Development

1. **Clone the repository:**

```bash
git clone https://github.com/OceanOfTechsa/syntac.git
cd syntac
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run the development server:**

```bash
npm run dev
```

4. **Open your browser** and navigate to `http://localhost:44300`

The page will automatically update as you edit files.

## 🏗 Project Structure

```
├── app/                    # Pages and layouts (App Router)
├── components/
│   ├── ui/                 # shadcn/ui primitives (button, dropdown-menu, ...)
│   ├── site/               # Site components (header, mega menu, banner, sections)
│   ├── gsap/               # GSAP animation components
│   └── providers/          # Context providers
├── data/                   # Content data (technologies, spotlight, ...)
├── lib/                    # Utilities (cn, gsap setup)
├── utils/                  # App settings and navigation links
├── public/
│   └── brand/              # Brand kit: logos, icons, company logos
└── .github/
    ├── workflows/          # CI, security, and release workflows
    └── dependabot.yml      # Automated dependency updates
```

## 🛠 Technologies Used

- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="20" height="20" alt="Next.js"/> **Next.js** – ⚡ React framework for server-side rendering and static site generation
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="20" height="20" alt="TypeScript"/> **TypeScript** – 🔷 Strongly typed JavaScript development
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="20" height="20" alt="Tailwind CSS"/> **Tailwind CSS** – 🎨 Styling and responsive layouts, with shadcn/ui components
- **GSAP** – ✨ Animations and motion
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" width="20" height="20" alt="Vercel"/> **Vercel** – 🚀 Hosting and deployment platform
- <img src="https://avatars.githubusercontent.com/u/12551863?s=200&v=4" width="20" height="20" alt="Semantic Release"/> **Semantic Release** – 📦 Automatic versioning and changelog generation

## 🌿 Branches

| Branch | Purpose | Releases |
|--------|---------|----------|
| `master` | Production | Stable versions, e.g. `1.2.0` |
| `uat` | Staging, where changes are tested first | Pre-releases, e.g. `1.2.0-uat.1` |
| `feature/*`, `fix/*` | Day-to-day work | None |

Changes go to `uat` first and are promoted to `master` once tested.

## 📈 Development Workflow

### Making Changes

1. **Create a new branch** from `uat` for your feature or fix:

```bash
git checkout uat
git pull
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

2. **Make your changes** and test them locally with the development server

3. **Run the same checks CI runs:**

```bash
npm run lint
npm test
npm run build
```

4. **Commit** using Conventional Commits (see below)

5. **Push** and open a Pull Request into `uat`

### Workflow Diagram

```
Developer
    |
    | (Commit using Conventional Commits)
    v
Feature Branch
    |
    | (Pull Request into uat)
    v
Automated checks: Test, Commitlint, CodeQL
    |
    | (Code review, then merge)
    v
uat branch
    |-- Release workflow publishes a pre-release (1.2.0-uat.1)
    |-- Vercel builds the staging preview
    |
    | (Tested on staging, then Pull Request uat -> master)
    v
master branch
    |
    | (Release workflow runs Semantic Release)
    |-- Updates CHANGELOG.md
    |-- Creates version tag
    |-- Generates GitHub Release
    v
Vercel (Production)
```

## ⚙️ GitHub Actions

| Workflow | Runs on | What it does |
|----------|---------|--------------|
| **Test** | Pull requests to `master` and `uat` | Installs dependencies, then runs lint, tests and a production build |
| **Commitlint** | Pull requests to `master` and `uat` | Checks every commit message follows Conventional Commits |
| **CodeQL** | Pushes and pull requests to `master` and `uat`, plus every Monday | Scans the code for security issues. Results appear in the repo's Security tab |
| **Release** | Pushes to `master` and `uat`, or run manually | Runs tests, then Semantic Release (version, tag, changelog, GitHub Release) |
| **Dependabot** | Weekly | Opens update PRs against `uat` for npm packages and GitHub Actions |

> A failing check shows a red cross on the pull request. Fix it before merging.

## 📝 Versioning & Semantic Release

This project uses **Semantic Versioning** and **Semantic Release** for automatic versioning, changelog generation, and GitHub releases. The next version is worked out from the commit messages merged since the last release.

### Commit Message Convention

| Commit Type | Description | Version Bump |
|------------|-------------|--------------|
| `feat:` | Adds a new feature | MINOR (1.0.0 → 1.1.0) |
| `fix:` | Bug fixes | PATCH (1.0.0 → 1.0.1) |
| `perf:` | Performance improvements | PATCH (1.0.0 → 1.0.1) |
| `BREAKING CHANGE:` footer | Breaking changes (add to the commit body) | MAJOR (1.0.0 → 2.0.0) |
| `chore:` | Dependencies, build scripts, tooling | None |
| `ci:` | Workflow and pipeline changes | None |
| `docs:` | Documentation only | None |
| `refactor:` | Code restructuring without changing behavior | None |
| `test:` | Adding or updating tests | None |

Dependabot commits use `chore(deps):` and `ci(deps):`, so dependency updates never trigger a release by themselves.

### Examples

```bash
git commit -m "feat: add technology spotlight section"
git commit -m "fix: correct mega menu alignment on tablets"
git commit -m "docs: update installation instructions"

# Breaking change: put the footer in the commit body
git commit -m "feat: redesign case study pages" -m "BREAKING CHANGE: case study URLs have changed"
```

> **Note:** Commitlint rejects messages that don't follow this format, so a pull request with a bad commit message will fail its check.

## 📦 Deployment

Deployments are handled by Vercel:

- Pull requests get a preview deployment
- The `uat` branch is our staging environment
- The `master` branch is production

### Manual Deployment

1. **Build the project:**

```bash
npm run build
```

2. **Deploy to Vercel:**

```bash
npx vercel --prod
```

## 🤝 Contributing

1. Create a feature branch from `uat`: `git checkout -b feature/amazing-feature`
2. Commit your changes using the Conventional Commits format
3. Push the branch: `git push origin feature/amazing-feature`
4. Open a Pull Request into `uat`
5. Wait for the checks to pass and for a review before merging

## 📄 CHANGELOG

The changelog is **automatically maintained** by Semantic Release. **Do not edit CHANGELOG.md manually.**

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) – Learn about features and APIs
- [Vercel Deployment Docs](https://vercel.com/docs) – Deployment guidelines
- [Semantic Versioning](https://semver.org/) – Versioning standards
- [Conventional Commits](https://www.conventionalcommits.org/) – Commit message guidelines

## ⚡ Best Practices

### ✅ Do's
- Always use Conventional Commits for proper version bumping
- Run lint, tests and a build locally before opening a Pull Request
- Open Pull Requests into `uat`, and promote `uat` to `master` once tested
- Keep components modular and reusable
- Follow TypeScript best practices
- Ensure responsive design across all devices

### ❌ Don'ts
- Do not manually edit `CHANGELOG.md`
- Avoid pushing directly to `master` or `uat`, use Pull Requests
- Do not merge a pull request with a failing check

## 🆘 Troubleshooting

### Common Issues

**Development server won't start:**
- Ensure Node.js 24 is installed
- Delete `node_modules` and run `npm install` again

**Build failures:**
- Check TypeScript errors with `npx tsc --noEmit`
- Verify all environment variables are set

**Commitlint check fails:**
- Reword the commit to follow the format, for example `fix: correct header spacing`
- To fix the latest commit: `git commit --amend`, then `git push --force-with-lease`

**Styling issues:**
- Clear browser cache
- Restart development server

For additional support, please open an issue in the repository.

---

Made with ❤️ by Synatc Software