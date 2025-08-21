# Contributing to MCP Greeting Server

Thank you for your interest in contributing to the MCP Greeting Server! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Adding New Languages](#adding-new-languages)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)

## 📜 Code of Conduct

This project follows a simple code of conduct:
- Be respectful and inclusive
- Help others learn and grow
- Focus on constructive feedback
- Keep discussions relevant to the project

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/mcp-greeting-server.git
   cd mcp-greeting-server
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Running the Server
```bash
# Start the server
npm start

# Or with watch mode for development
npm run dev
```

### Testing
```bash
# Run tests
npm test
```

## 🔄 Making Changes

### Branch Naming
Use descriptive branch names:
- `feature/add-german-language`
- `fix/timezone-bug`
- `docs/update-readme`

### Commit Messages
Follow conventional commit format:
```
feat: add German language support
fix: resolve timezone calculation bug
docs: update installation instructions
test: add unit tests for greeting function
```

## 🌍 Adding New Languages

To add support for a new language:

1. **Update the greetings object** in `index.js`:
   ```javascript
   de: {
     morning: { text: 'Guten Morgen!', emoji: '🌅' },
     afternoon: { text: 'Guten Tag!', emoji: '☀️' },
     evening: { text: 'Guten Abend!', emoji: '🌙' },
     friend: 'Freund',
     timeText: 'Es ist',
     hopeText: 'Ich hoffe, Sie haben eine tolle Zeit!'
   }
   ```

2. **Add to the schema enum**:
   ```javascript
   enum: ["en", "pt", "es", "fr", "de"]
   ```

3. **Update documentation**:
   - Add language to README.md supported languages table
   - Update examples in CONTRIBUTING.md

4. **Add tests**:
   ```javascript
   console.log('Test - German greeting:');
   console.log(mockGreetingFunction({ language: 'de' }));
   ```

### Language Requirements
- Morning greeting (5:00-11:59)
- Afternoon greeting (12:00-17:59)  
- Evening greeting (18:00-4:59)
- Friend word (fallback when no name provided)
- Time text (e.g., "It's", "São", "Es ist")
- Hope message

## 🧪 Testing

### Manual Testing
```bash
# Test basic functionality
npm test

# Test specific scenarios
node -e "console.log('Testing...')"
```

### Test Coverage
Ensure your changes don't break existing functionality:
- Test all supported languages
- Test different timezones
- Test with and without names
- Test edge cases (midnight, noon)

## 📤 Submitting Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit:
   ```bash
   git add .
   git commit -m "feat: your descriptive commit message"
   ```

3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request**:
   - Use a descriptive title
   - Explain what changes you made
   - Reference any related issues
   - Include screenshots if applicable

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] All tests pass

## Checklist
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Documentation updated
```

## 🐛 Reporting Issues

When reporting issues, please include:
- Operating system and version
- Node.js version
- Steps to reproduce
- Expected vs actual behavior
- Error messages (if any)

## 💡 Feature Requests

We welcome feature requests! Please:
- Check existing issues first
- Describe the use case
- Explain why it would be valuable
- Consider implementation complexity

## 🙏 Recognition

All contributors will be recognized in the project. Thank you for helping make this project better!

---

**Maintainer:** Gustavo Roberto (gustavorobertux@gmail.com)  
**Repository:** https://github.com/gustavorobertux/mcp-greeting-server
