# Examples

This directory contains practical examples demonstrating the Schema.ICU SDK capabilities.

## ⚙️ Prerequisites

Before running examples, ensure you have:

1. **Node.js** >= 14.0.0 installed
2. **Schema.ICU credentials** configured

### First-Time Setup

```bash
# Install dependencies (from project root)
npm install

# Configure your Schema.ICU credentials
npx schema-icu setup

# Follow the prompts to enter:
# - Your email address
# - Your API key (get one at https://schema.icu)

# This creates a .env file that all examples use automatically
```

## 📁 Files

### **all-agents.js**
Comprehensive demonstration of all 11 Schema.ICU agents:
- Base Agent - General purpose queries
- Code Generator - Production-ready code generation
- Schema Generator - JSON schema creation
- Terminal Agent - Shell command generation
- Code Improver - Code optimization
- Diff Improver - Code improvements with diffs
- Box Designer - Modular component design
- Project Planner - Project breakdown and planning
- Prompt Improver - Prompt optimization
- Tool Choice - Agent recommendation
- GitHub Agent - GitHub CLI workflows

**Run:** `npm run demo`

---

### **project-manager.js**
Production-ready `ProjectManager` class that wraps the SDK for common development workflows. Includes methods for:
- Creating project plans
- Generating code features
- Getting terminal commands
- Creating API schemas
- Improving existing code
- Generating code diffs
- Designing components
- Improving prompts
- Getting GitHub workflows
- Asking general questions
- Recommending the best agent

**Run:** `npm run pm`

**Usage:**
```javascript
const ProjectManager = require('./examples/project-manager');
const pm = new ProjectManager();

// Create a project plan
const plan = await pm.createProjectPlan('Build a REST API with authentication');

// Generate code
const code = await pm.generateFeature('JWT token validator', 'JavaScript');
```

---

### **error-handling.js**
Demonstrates robust error handling patterns for production applications:
- ✅ Authentication validation
- ✅ Retry logic with exponential backoff
- ✅ Response validation
- ✅ Missing context detection
- ✅ Network error handling
- ✅ Rate limit handling (Enterprise tier has no limits)
- ✅ Graceful degradation
- ✅ Comprehensive error categorization

**Run:** `npm run errors`

**Key Patterns:**
- Try-catch blocks with specific error types
- Retry mechanisms for transient failures
- Fallback strategies
- Detailed error logging
- User-friendly error messages

---

## 🚀 Quick Start

```bash
# Run all agents demo
npm run demo

# Try the ProjectManager class
npm run pm

# Learn error handling patterns
npm run errors

# Interactive CLI (all agents)
npm run cli
```

## 📝 Notes

- All examples automatically load credentials from `.env`
- API responses are cryptographically signed
- Enterprise tier provides unlimited requests
- All outputs are structured and validated

## 🔗 Related

- See [../README.md](../README.md) for setup instructions
- See [../CUSTOMER_GUIDE.md](../CUSTOMER_GUIDE.md) for detailed API documentation
- See [../tests/](../tests/) for unit tests
