# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based developer portfolio template called DeveloperFolio. It's a customizable, responsive portfolio for developers featuring sections for skills, experience, education, projects, blogs, and contact information. The project includes many modern interactive components and uses GitHub API integration to dynamically fetch profile data.

## Development Commands

- `npm start` - Start development server (runs fetch.js first to get GitHub data)
- `npm run build` - Build production bundle (runs fetch.js first)
- `npm test` - Run React tests
- `npm run format` - Format code using Prettier
- `npm run check-format` - Check code formatting
- `npm run deploy` - Deploy to GitHub Pages using gh-pages

## Docker Development

- `docker build -t developerfolio:latest .` - Build Docker image
- `docker run -t -p 3000:3000 developerfolio:latest` - Run container on port 3000

The Dockerfile uses Node 20 Alpine and includes hot-reload functionality for development.

## Key Architecture Components

### Data Fetching System
- `fetch.js` - Pre-build script that fetches GitHub profile and repository data via GraphQL API
- Uses environment variables from `.env` file for GitHub token and usernames
- Fetches Medium blog data if configured
- Generated data is used throughout the application

### Configuration Hub
- `src/portfolio.js` - Main configuration file containing all portfolio content
- All sections (greeting, skills, experience, projects, etc.) are configured here
- Uses `react-easy-emoji` for emoji handling
- Centralized color theming via `src/_globalColor.scss`

### Component Structure
- **Core containers**: Main sections like Greeting, Skills, Experience, Projects in `src/containers/`
- **Interactive components**: Many new components in `src/components/` including:
  - CareerJourney, SkillsMatrix, ProjectShowcase with advanced interactions
  - ArchitectureDiagram, TechRadar for technical visualizations
  - GameMode, EasterEggs for engagement features
  - ScrollProgress, SectionReveal for smooth UX
- **Utilities**: StyleContext for theme management, custom hooks in `src/hooks/`

### GitHub Integration
- Automatic fetching of pinned repositories
- Profile information sync
- Repository statistics and language data
- Requires `REACT_APP_GITHUB_TOKEN` environment variable

### Deployment
- GitHub Actions workflow (`.github/workflows/deploy.yml`) for automated deployment
- Deploys to `gh-pages` branch weekly via cron job
- Manual deployment via `workflow_dispatch`
- Supports custom domain configuration

## Environment Setup

Copy `env.example` to `.env` and configure:
- `REACT_APP_GITHUB_TOKEN` - GitHub personal access token
- `GITHUB_USERNAME` - GitHub username
- `USE_GITHUB_DATA` - Set to "true" to enable GitHub data fetching
- `MEDIUM_USERNAME` - Medium username for blog integration

## Development Notes

- Portfolio content is entirely driven by `src/portfolio.js` configuration
- Color scheme can be globally modified in `src/_globalColor.scss`
- Lottie animations are stored in `src/assets/lottie/`
- Uses React 16 with class-based components in some areas
- Sass for styling with component-scoped SCSS files
- React-reveal for scroll animations

## Testing & Quality

- Uses React Testing Library and Enzyme for testing
- Prettier for code formatting
- ESLint with react-app configuration
- GitHub Actions runs automated deployment and formatting checks