# Schema.ICU Project Manager

A project management toolkit powered by Schema.ICU's 11 specialized AI agents with cryptographic signing and guaranteed structured outputs.

## 🚀 Quick Start

```bash
# Run quick test (3 agents)
npm start

# Demo all 11 agents
npm run demo

# Use the project manager class
npm run pm

# Interactive CLI
npm run cli

# Error handling examples
npm run errors

# Run tests
npm test
```

## ✅ Setup Complete

Your environment is configured with:
- **Tier**: Enterprise (unlimited requests)
- **Email**: codenlighten1@gmail.com
- **API Key**: Stored in `.env`
- **Auto-load**: SDK automatically loads credentials

## 📚 11 Specialized Agents

### 1. Base Agent
General-purpose queries and explanations
```javascript
const result = await client.base.query('Explain closures in JavaScript');
```

### 2. Code Generator
Generate production-ready code in any language
```javascript
const code = await client.codeGenerator.generate(
  'Create a debounce function with 300ms delay',
  { language: 'JavaScript' }
);
console.log(code.data.code);
```

### 3. Schema Generator
Create JSON schemas with validation rules
```javascript
const schema = await client.schemaGenerator.generate(
  'Create schema for user profile with name, email, age'
);
console.log(schema.data.schemaAsString);
```

### 4. Terminal Agent
Generate optimal shell commands
```javascript
const cmd = await client.terminalAgent.generate(
  'Find all JavaScript files modified in last 7 days',
  { os: 'windows', shell: 'bash' }
);
console.log(cmd.data.code);
```

### 5. Code Improver
Optimize existing code without breaking changes
```javascript
const improved = await client.codeImprover.improve(
  'Add error handling and type safety',
  { code: 'function add(a,b){return a+b}', language: 'JavaScript' }
);
console.log(improved.data.improvedCode);
```

### 6. Diff Improver
Code improvements with unified diffs
```javascript
const diff = await client.diffImprover.improve(
  'const x = 1;\nconst y = 2;',
  { language: 'JavaScript', focusAreas: ['readability', 'modern syntax'] }
);
console.log(diff.data.diff);
```

### 7. Box Designer
Design modular components (Alan Kay philosophy)
```javascript
const box = await client.boxDesigner.design(
  'Design a modular authentication component'
);
console.log(box.data.name, box.data.description);
```

### 8. Project Planner
Break down projects with time estimates
```javascript
const plan = await client.projectPlanner.plan(
  'Build a task management API',
  { technology: 'Node.js, Express', experience: 'intermediate' }
);
console.log(plan.data.projectName);
plan.data.tasks.forEach(t => console.log(`${t.taskName}: ${t.estimatedTimeHours}h`));
```

### 9. Prompt Improver
Optimize prompts for better results
```javascript
const prompt = await client.promptImprover.improve('make a function');
console.log(prompt.data.improvedPrompt);
```

### 10. Tool Choice
Select the best agent for your task
```javascript
const tool = await client.toolChoice.recommend(
  'I need to generate a REST API endpoint',
  {
    availableTools: [
      { name: 'codeGenerator', description: 'Generate code' },
      { name: 'schemaGenerator', description: 'Create schemas' }
    ]
  }
);
console.log(tool.data.chosenTool, tool.data.reasoning);
```

### 11. GitHub Agent
Generate GitHub CLI commands
```javascript
const github = await client.githubAgent.generate(
  'Create a new branch called feature/new-ui'
);
console.log(github.data.githubCommands);
```

## 🏗️ Project Structure

```
project-mgr/
├── .env                          # API credentials (auto-configured)
├── .gitignore                    # Git ignore patterns
├── package.json                  # Dependencies & scripts
├── cli.js                        # Interactive CLI tool
├── index.js                      # Quick test (3 agents)
├── schema-icu-sdk.d.ts          # TypeScript definitions
├── examples/
│   ├── all-agents.js            # Demo all 11 agents
│   ├── project-manager.js       # Reusable ProjectManager class
│   ├── error-handling.js        # Error handling patterns
│   └── outputs/                 # Sample agent responses
│       └── README.md
├── tests/
│   └── project-manager.test.js  # Unit tests
└── README.md                     # This file
```

## 💻 ProjectManager Class

Reusable class for common project management tasks:

```javascript
const ProjectManager = require('./examples/project-manager');
const pm = new ProjectManager();

// Create project plan
const plan = await pm.createProjectPlan(
  'Build a blog API with auth',
  { technology: 'Node.js, MongoDB' }
);

// Generate feature code
const code = await pm.generateFeature(
  'JWT authentication middleware',
  'JavaScript'
);

// Get setup commands
const setup = await pm.getSetupCommands('Node.js REST API');

// Generate API schema
const schema = await pm.generateAPISchema(
  'User profile with id, name, email'
);

// Improve existing code
const improved = await pm.improveCode(
  'function old(){...}',
  'performance, readability',
  'JavaScript'
);

// Get code diff
const diff = await pm.getCodeDiff(codeString, ['readability']);

// Design component
const component = await pm.designComponent('Auth module');

// Improve prompt
const betterPrompt = await pm.improvePrompt('make a function');

// Get GitHub workflow
const ghCommands = await pm.getGitHubWorkflow('Create PR');

// Recommend agent
const recommendation = await pm.recommendAgent('I need to generate code');

// Ask question
const answer = await pm.askQuestion('What is a closure?');
```

## 🛡️ Error Handling

See `examples/error-handling.js` for comprehensive error handling patterns:

```bash
npm run errors
```

Includes:
- Authentication checks
- Retry logic with exponential backoff
- Response validation
- Missing context handling
- Network error handling
- Rate limit handling
- Graceful degradation
- Comprehensive error categorization

## 🎮 Interactive CLI

Launch an interactive CLI to use all agents:

```bash
npm run cli
```

Available commands:
- `/code <query>` - Generate code
- `/schema <query>` - Generate JSON schema
- `/terminal <query>` - Get terminal command
- `/improve <code>` - Improve code
- `/plan <project>` - Plan a project
- `/prompt <text>` - Improve a prompt
- `/github <task>` - Get GitHub CLI commands
- `/box <component>` - Design modular component
- `/choose <task>` - Recommend best agent
- `/ask <question>` - General query
- `/help` - Show all commands

## 🧪 Testing

Run the test suite:

```bash
npm test           # Run all tests
npm run test:watch # Watch mode
```

Tests include:
- Unit tests for ProjectManager methods
- Integration tests for full workflows
- API response validation
- Error handling verification

## 📘 TypeScript Support

TypeScript definitions included in `schema-icu-sdk.d.ts`:

```typescript
import { SchemaICU, CodeGeneratorData } from '@smartledger/schema-icu-sdk';

const client = new SchemaICU();
const result = await client.codeGenerator.generate('Create hello function', { language: 'JavaScript' });
// Full type safety and autocomplete
```

## 🔐 Key Features

- **JSON Schema Validation**: Guaranteed structured responses, no parsing errors
- **Cryptographic Signing**: BSV-signed responses for authenticity verification
- **Enterprise Tier**: Unlimited requests (vs 200/day free tier)
- **Cost Optimized**: $0.05/1M tokens (96% cheaper than GPT-4)
- **Production Ready**: 99.9% uptime SLA with comprehensive error handling
- **11 Specialized Agents**: Purpose-built for specific tasks

## 📖 Response Format

All agents return a consistent structure:

```javascript
{
  success: true,
  data: {
    code: '...generated output...',
    reasoning: 'Why this solution was chosen',
    missingContext: [],
    // Agent-specific fields...
  },
  timestamp: '2025-12-10T01:35:27.559Z',
  signature: {
    hash: '...',
    signature: '...',
    publicKey: '...',
    signedAt: '...'
  }
}
```

## 🔗 Links

- [Schema.ICU Website](https://schema.icu)
- [API Documentation](https://schema.icu/docs/API_DOCS.html)
- [GitHub Repository](https://github.com/codenlighten/schema-icu)
- [SmartLedger](https://smartledger.technology/)

## 💡 Support

- **Enterprise Support**: support@smartledger.technology
- **Documentation**: https://schema.icu/docs
- **Status Page**: https://status.schema.icu/

---

**Built with Schema.ICU** • Structured AI. Verified. Trusted.
