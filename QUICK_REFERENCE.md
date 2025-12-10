# Quick Reference Card

## 🎯 About Schema.ICU

**Schema.ICU** is a production-ready AI agent orchestration platform featuring:
- 🎯 Guaranteed JSON Schema-validated structured outputs
- 🔐 BSV cryptographic signing for authenticity
- ⚡ 96% cheaper than GPT-4 ($0.05/1M tokens)
- 🤖 11 specialized AI agents
- 📊 99.9% uptime SLA

**Website**: https://schema.icu  
**Company**: SmartLedger Technologies

## 🚀 Setup (First Time)

```bash
# 1. Install dependencies
npm install

# 2. Configure credentials
npx schema-icu setup

# 3. Run your first example
npm start
```

## 📋 Common Commands

| Command | Description |
|---------|-------------|
| `npx schema-icu setup` | Configure your API credentials |
| `npm start` | Quick test (3 agents) |
| `npm run demo` | Demo all 11 agents |
| `npm run cli` | Interactive CLI |
| `npm run pm` | ProjectManager example |
| `npm run errors` | Error handling patterns |
| `npm test` | Run test suite |
| `npm run lint` | Check code quality |
| `npm run format` | Format code |

## 🔑 Credentials

### Pricing Tiers

| Tier | Price | Requests | Features |
|------|-------|----------|----------|
| **Free** | $0 | 21/day | All 11 agents, JSON validation, signing |
| **Registered** | $0 | 200/day | + Email support, usage analytics |
| **Professional** | $49/mo | 3M/month | + Priority support, webhooks, 99.9% SLA |
| **Enterprise** | Custom | Unlimited | + Custom integrations, dedicated support |

### Option 1: Interactive Setup (Recommended)
```bash
npx schema-icu setup
```
Follow the prompts to enter:
- Email address
- API key

### Option 2: Manual .env File
Create `.env` in project root:
```bash
SCHEMA_ICU_API_KEY=your_api_key_here
SCHEMA_ICU_EMAIL=your_email@example.com
```

## 🎯 11 Agents Quick Reference

| Agent | Purpose | Method |
|-------|---------|--------|
| **Base** | General queries | `client.base.query()` |
| **Code Generator** | Generate code | `client.codeGenerator.generate()` |
| **Schema Generator** | Create JSON schemas | `client.schemaGenerator.generate()` |
| **Terminal** | Shell commands | `client.terminalAgent.generate()` |
| **Code Improver** | Improve code | `client.codeImprover.improve()` |
| **Diff Improver** | Code with diffs | `client.diffImprover.improve()` |
| **Box Designer** | Design components | `client.boxDesigner.design()` |
| **Project Planner** | Plan projects | `client.projectPlanner.plan()` |
| **Prompt Improver** | Optimize prompts | `client.promptImprover.improve()` |
| **Tool Choice** | Recommend agent | `client.toolChoice.choose()` |
| **GitHub** | GitHub workflows | `client.githubAgent.generate()` |

## 💡 Quick Examples

### Generate Code
```javascript
const { SchemaICU } = require('@smartledger/schema-icu-sdk');
const client = new SchemaICU();

const result = await client.codeGenerator.generate(
  'Create a function to validate email addresses',
  { language: 'JavaScript' }
);
console.log(result.data.code);
```

### Plan a Project
```javascript
const plan = await client.projectPlanner.plan(
  'Build a REST API with authentication',
  { technology: 'Node.js, Express', experience: 'intermediate' }
);
console.log(plan.data.tasks);
```

### Get Terminal Command
```javascript
const cmd = await client.terminalAgent.generate(
  'Find all JavaScript files modified in last 7 days',
  { os: 'linux', shell: 'bash' }
);
console.log(cmd.data.code);
```

## 🛡️ Authentication Check

```javascript
const client = new SchemaICU();

if (!client.isAuthenticated()) {
  console.error('Not authenticated. Run: npx schema-icu setup');
  process.exit(1);
}
```

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Not authenticated" | Run `npx schema-icu setup` |
| Missing `.env` file | Run `npx schema-icu setup` |
| API key invalid | Get new key from https://schema.icu |
| Tests failing | Check internet connection and credentials |
| Linting errors | Run `npm run lint` to see issues |

## 📚 Resources

- **Schema.ICU Website**: https://schema.icu
- **API Documentation**: https://schema.icu/docs/API_DOCS.html
- **GitHub SDK**: https://github.com/codenlighten/schema-icu
- **This Example Repo**: https://github.com/codenlighten/schema-icu-sdk-example
- **Status Page**: https://status.schema.icu
- **SmartLedger**: https://smartledger.technology

## 🔗 Links

- **Get Started Free**: https://schema.icu/register.html (21 requests/day)
- **Pricing**: https://schema.icu/#pricing
- **Report Issues**: https://github.com/codenlighten/schema-icu-sdk-example/issues
- **Enterprise Sales**: enterprise@smartledger.technology
- **Support**: support@smartledger.technology

---

**Need Help?** Open an issue or email: support@smartledger.technology
