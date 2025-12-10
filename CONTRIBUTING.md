# Contributing to Schema.ICU SDK Example

Thank you for your interest in contributing! This project demonstrates the Schema.ICU SDK with practical examples and tools.

## 🚀 Getting Started

### Prerequisites
- Node.js >= 14.0.0
- npm >= 6.0.0
- Schema.ICU API credentials (get them at [Schema.ICU](https://schema.icu))

### Setup
```bash
# Clone the repository
git clone https://github.com/codenlighten/schema-icu-sdk-example.git
cd schema-icu-sdk-example

# Install dependencies
npm install

# Set up your credentials
npx schema-icu setup
# Or create .env file with:
# SCHEMA_ICU_API_KEY=your_key
# SCHEMA_ICU_EMAIL=your_email

# Run tests
npm test

# Try examples
npm start
npm run demo
npm run cli
```

## 📝 How to Contribute

### Reporting Bugs
1. Check if the bug is already reported in [Issues](https://github.com/codenlighten/schema-icu-sdk-example/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment (Node version, OS)
   - Code samples if applicable

### Suggesting Features
1. Check existing [Issues](https://github.com/codenlighten/schema-icu-sdk-example/issues) for similar suggestions
2. Create a new issue tagged `enhancement` with:
   - Clear use case description
   - Proposed solution
   - Alternative solutions considered
   - Example code if applicable

### Submitting Pull Requests

#### 1. Fork and Clone
```bash
fork the repository on GitHub
git clone https://github.com/YOUR_USERNAME/schema-icu-sdk-example.git
cd schema-icu-sdk-example
git remote add upstream https://github.com/codenlighten/schema-icu-sdk-example.git
```

#### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

#### 3. Make Your Changes
- Write clear, commented code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

#### 4. Test Your Changes
```bash
# Run linter
npm run lint

# Format code
npm run format

# Run tests
npm test

# Try your changes manually
npm start
npm run demo
```

#### 5. Commit Your Changes
```bash
git add .
git commit -m "feat: add new example for X agent"
# or
git commit -m "fix: resolve authentication issue in CLI"
```

**Commit Message Guidelines:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `test:` Adding or updating tests
- `refactor:` Code refactoring
- `style:` Formatting changes
- `chore:` Maintenance tasks

#### 6. Push and Create PR
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear description of changes
- Link to related issues
- Screenshots/examples if applicable

## 🎨 Code Style

This project uses:
- **ESLint** for code quality
- **Prettier** for formatting
- **Jest** for testing

Run before committing:
```bash
npm run lint      # Check for issues
npm run format    # Auto-format code
npm test          # Run all tests
```

### JavaScript Style Guide
- Use `const` for constants, `let` for variables
- Single quotes for strings
- Semicolons required
- 2 space indentation
- 100 character line length
- Descriptive variable names
- Comments for complex logic

## 📦 Project Structure

```
schema-icu-sdk-example/
├── index.js              # Quick start demo
├── cli.js                # Interactive CLI
├── examples/
│   ├── all-agents.js     # All 11 agents demo
│   ├── project-manager.js # ProjectManager class
│   └── error-handling.js # Error handling patterns
├── tests/
│   └── project-manager.test.js # Unit tests
├── schema-icu-sdk.d.ts   # TypeScript definitions
└── docs/                 # Documentation
```

## 🧪 Testing Guidelines

### Writing Tests
- Test files: `*.test.js` in `tests/` directory
- Use Jest framework
- Test both success and error cases
- Mock external API calls when appropriate
- Use descriptive test names

```javascript
describe('ProjectManager', () => {
  test('should generate code successfully', async () => {
    const pm = new ProjectManager();
    const result = await pm.generateFeature('hello function');
    expect(result.code).toBeDefined();
  });
});
```

### Running Tests
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm test -- --coverage # With coverage
```

## 📚 Adding Examples

When adding new examples:
1. Place in `examples/` directory
2. Add npm script in `package.json`
3. Update `examples/README.md`
4. Include error handling
5. Add comments explaining the code
6. Test with actual API calls

## 🐛 Debugging Tips

- Check `.env` file has valid credentials
- Verify Node.js version: `node --version`
- Clear cache: `rm -rf node_modules && npm install`
- Check SDK version: `npm list @smartledger/schema-icu-sdk`
- Enable debug mode: `DEBUG=* node your-script.js`

## 📄 Documentation

When updating documentation:
- Use clear, concise language
- Include code examples
- Add emoji for visual organization 🎯
- Update table of contents if needed
- Check for broken links

## ❓ Questions?

- Open an [Issue](https://github.com/codenlighten/schema-icu-sdk-example/issues)
- Email: codenlighten1@gmail.com
- Check [Schema.ICU Documentation](https://schema.icu)

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing! 🙏**
