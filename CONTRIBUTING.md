# Contributing to Claude RAG Frontend

Thank you for your interest in contributing to Claude RAG Frontend! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/bambusoe02/claude-rag-frontend.git
   cd claude-rag-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and set NEXT_PUBLIC_API_URL
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

Visit http://localhost:3000

## 📝 Development Guidelines

### Code Style

- **TypeScript**: Strict type checking enabled - all code must be properly typed
- **ESLint**: Follow Next.js ESLint rules - run `npm run lint` before committing
- **Prettier**: Code formatting via ESLint integration
- **Naming**: Use descriptive names, follow React/TypeScript conventions

### Testing

- Write tests for new features using Jest and React Testing Library
- Run tests: `npm test` (if configured)
- Aim for good test coverage for new components

### Commit Messages

Follow conventional commits format:
- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`
- `refactor: improve code structure`
- `test: add tests`
- `chore: update dependencies`

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Write clean, tested code
   - Update documentation if needed
   - Follow code style guidelines

3. **Run checks before submitting**
   ```bash
   npm run lint
   npx tsc --noEmit
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Provide clear description of changes
   - Reference any related issues
   - Ensure CI checks pass

## 🐛 Reporting Bugs

When reporting bugs, please include:
- **Description**: Clear description of the bug
- **Steps to reproduce**: Detailed steps to reproduce the issue
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: Node.js version, OS, browser
- **Screenshots**: If applicable

## 💡 Suggesting Features

When suggesting features:
- **Use case**: Describe the problem you're trying to solve
- **Proposed solution**: How you envision the feature working
- **Alternatives**: Other solutions you've considered
- **Additional context**: Any other relevant information

## 🔒 Security Issues

**Do not** open public issues for security vulnerabilities. Instead, email security concerns to: bambusoe@gmail.com

## 📚 Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for new functions/components
- Keep documentation up to date

## ✅ Code Review Checklist

Before submitting PR, ensure:
- [ ] Code follows style guidelines
- [ ] TypeScript types are correct
- [ ] No console.log statements
- [ ] Error handling is implemented
- [ ] Documentation is updated
- [ ] No hardcoded API URLs or secrets
- [ ] Environment variables are documented

## 🎯 Areas for Contribution

We welcome contributions in:
- **New features**: UI improvements, new components
- **Bug fixes**: Any issues you encounter
- **Documentation**: Improvements to docs, examples
- **Testing**: Add tests for components
- **Performance**: Optimizations and improvements
- **UI/UX**: Design improvements, accessibility

## 📞 Questions?

Feel free to:
- Open an issue for questions
- Email: bambusoe@gmail.com
- Check existing issues and discussions

Thank you for contributing to Claude RAG Frontend! 🎉

