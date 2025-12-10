#!/usr/bin/env node

const { SchemaICU } = require('@smartledger/schema-icu-sdk');
const readline = require('readline');

/**
 * Interactive CLI for Schema.ICU SDK
 * 
 * Usage: node cli.js
 * Or add to package.json scripts: "cli": "node cli.js"
 */

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '🤖 schema-icu> '
});

const client = new SchemaICU();

// Check authentication before starting
if (!client.isAuthenticated()) {
  console.error('\n❌ Not authenticated. Please run: npx schema-icu setup');
  console.error('   Or ensure your .env file contains valid credentials.\n');
  process.exit(1);
}

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m'
};

function print(text, color = 'reset') {
  console.log(colors[color] + text + colors.reset);
}

function printHelp() {
  print('\n📚 Available Commands:', 'bright');
  print('  /code <query>           - Generate code', 'cyan');
  print('  /schema <query>         - Generate JSON schema', 'cyan');
  print('  /terminal <query>       - Get terminal command', 'cyan');
  print('  /improve <code>         - Improve code', 'cyan');
  print('  /plan <project>         - Plan a project', 'cyan');
  print('  /prompt <text>          - Improve a prompt', 'cyan');
  print('  /github <task>          - Get GitHub CLI commands', 'cyan');
  print('  /box <component>        - Design modular component', 'cyan');
  print('  /choose <task>          - Recommend best agent', 'cyan');
  print('  /ask <question>         - General query (base agent)', 'cyan');
  print('  /help                   - Show this help', 'cyan');
  print('  /exit or Ctrl+C         - Exit CLI\n', 'cyan');
  print('💡 Tip: Just type your query without a command for base agent\n', 'yellow');
}

async function handleCommand(input) {
  const trimmed = input.trim();
  
  if (!trimmed) {
    return;
  }

  try {
    // Parse command
    const [command, ...args] = trimmed.split(' ');
    const query = args.join(' ');

    switch (command.toLowerCase()) {
      case '/help':
      case '/h':
        printHelp();
        break;

      case '/exit':
      case '/quit':
      case '/q':
        print('\n👋 Goodbye!\n', 'green');
        process.exit(0);
        break;

      case '/code':
      case '/generate':
        if (!query) {
          print('❌ Usage: /code <description>', 'red');
          break;
        }
        print('🔄 Generating code...', 'yellow');
        const codeResult = await client.codeGenerator.generate(query, { language: 'JavaScript' });
        if (codeResult.success) {
          print('\n✅ Generated Code:', 'green');
          console.log(codeResult.data.code);
          print(`\n💭 Reasoning: ${codeResult.data.reasoning}`, 'magenta');
        }
        break;

      case '/schema':
        if (!query) {
          print('❌ Usage: /schema <description>', 'red');
          break;
        }
        print('🔄 Generating schema...', 'yellow');
        const schemaResult = await client.schemaGenerator.generate(query);
        if (schemaResult.success) {
          print('\n✅ JSON Schema:', 'green');
          console.log(schemaResult.data.schemaAsString || schemaResult.data.code);
        }
        break;

      case '/terminal':
      case '/cmd':
        if (!query) {
          print('❌ Usage: /terminal <task description>', 'red');
          break;
        }
        print('🔄 Generating command...', 'yellow');
        const termResult = await client.terminalAgent.generate(query, { os: 'windows', shell: 'bash' });
        if (termResult.success) {
          print('\n✅ Command:', 'green');
          console.log(termResult.data.code);
          print(`\n💭 Reasoning: ${termResult.data.reasoning}`, 'magenta');
        }
        break;

      case '/improve':
        if (!query) {
          print('❌ Usage: /improve <code to improve>', 'red');
          break;
        }
        print('🔄 Improving code...', 'yellow');
        const improveResult = await client.codeImprover.improve(
          'Improve this code',
          { code: query, language: 'JavaScript' }
        );
        if (improveResult.success) {
          print('\n✅ Improved Code:', 'green');
          console.log(improveResult.data.improvedCode || improveResult.data.code);
        }
        break;

      case '/plan':
      case '/project':
        if (!query) {
          print('❌ Usage: /plan <project description>', 'red');
          break;
        }
        print('🔄 Planning project...', 'yellow');
        const planResult = await client.projectPlanner.plan(query, { experience: 'intermediate' });
        if (planResult.success) {
          print(`\n✅ Project: ${planResult.data.projectName}`, 'green');
          print(`📝 ${planResult.data.projectDescription}\n`, 'cyan');
          if (planResult.data.tasks) {
            print('📋 Tasks:', 'bright');
            planResult.data.tasks.forEach((task, i) => {
              console.log(`  ${i + 1}. ${task.taskName} (${task.estimatedTimeHours}h)`);
              console.log(`     ${task.taskDescription}`);
            });
            const total = planResult.data.tasks.reduce((sum, t) => sum + t.estimatedTimeHours, 0);
            print(`\n⏱️  Total: ${total} hours (${(total / 8).toFixed(1)} days)\n`, 'yellow');
          }
        }
        break;

      case '/prompt':
        if (!query) {
          print('❌ Usage: /prompt <prompt to improve>', 'red');
          break;
        }
        print('🔄 Improving prompt...', 'yellow');
        const promptResult = await client.promptImprover.improve(query);
        if (promptResult.success) {
          print('\n✅ Improved Prompt:', 'green');
          console.log(promptResult.data.improvedPrompt || promptResult.data.code);
        }
        break;

      case '/github':
      case '/gh':
        if (!query) {
          print('❌ Usage: /github <task description>', 'red');
          break;
        }
        print('🔄 Generating GitHub commands...', 'yellow');
        const ghResult = await client.githubAgent.generate(query);
        if (ghResult.success) {
          print('\n✅ GitHub Commands:', 'green');
          if (ghResult.data.githubCommands) {
            ghResult.data.githubCommands.forEach(cmd => {
              console.log(`  ${cmd.command}`);
              print(`    → ${cmd.reasoning}`, 'magenta');
            });
          } else {
            console.log(ghResult.data.code);
          }
        }
        break;

      case '/box':
      case '/design':
        if (!query) {
          print('❌ Usage: /box <component description>', 'red');
          break;
        }
        print('🔄 Designing component...', 'yellow');
        const boxResult = await client.boxDesigner.design(query);
        if (boxResult.success) {
          print(`\n✅ Component: ${boxResult.data.name}`, 'green');
          print(`📝 ${boxResult.data.description}\n`, 'cyan');
          if (boxResult.data.inputs) {
            print('📥 Inputs:', 'bright');
            boxResult.data.inputs.forEach(i => console.log(`  • ${i.name}: ${i.description}`));
          }
          if (boxResult.data.outputs) {
            print('\n📤 Outputs:', 'bright');
            boxResult.data.outputs.forEach(o => console.log(`  • ${o.name}: ${o.description}`));
          }
        }
        break;

      case '/choose':
      case '/recommend':
        if (!query) {
          print('❌ Usage: /choose <task description>', 'red');
          break;
        }
        print('🔄 Recommending agent...', 'yellow');
        const chooseResult = await client.toolChoice.recommend(query, {
          availableTools: [
            { name: 'codeGenerator', description: 'Generate code' },
            { name: 'schemaGenerator', description: 'Create schemas' },
            { name: 'terminalAgent', description: 'Shell commands' },
            { name: 'projectPlanner', description: 'Plan projects' },
            { name: 'codeImprover', description: 'Improve code' }
          ]
        });
        if (chooseResult.success) {
          print(`\n✅ Recommended Agent: ${chooseResult.data.chosenTool}`, 'green');
          print(`💭 ${chooseResult.data.reasoning}\n`, 'magenta');
          if (chooseResult.data.alternativeTools) {
            print('📌 Alternatives:', 'yellow');
            chooseResult.data.alternativeTools.forEach(alt => {
              console.log(`  • ${alt.tool} (score: ${alt.score})`);
            });
          }
        }
        break;

      case '/ask':
      default:
        // Default to base agent for general queries
        const askQuery = command.startsWith('/ask') ? query : trimmed;
        if (!askQuery) {
          print('❌ Please provide a query', 'red');
          break;
        }
        print('🔄 Processing query...', 'yellow');
        const baseResult = await client.base.query(askQuery);
        if (baseResult.success) {
          print('\n✅ Response:', 'green');
          console.log(baseResult.data.code || baseResult.data);
        }
        break;
    }

    console.log(); // Empty line for readability
  } catch (error) {
    print(`\n❌ Error: ${error.message}`, 'red');
    if (error.statusCode === 400 && error.response?.error) {
      print(`   Details: ${error.response.error}`, 'yellow');
    }
    console.log();
  }
}

// Startup
async function start() {
  console.clear();
  print('╔════════════════════════════════════════════════════════╗', 'cyan');
  print('║          🤖 Schema.ICU Interactive CLI                ║', 'cyan');
  print('║          Powered by 11 Specialized AI Agents          ║', 'cyan');
  print('╚════════════════════════════════════════════════════════╝', 'cyan');
  
  if (!client.isAuthenticated()) {
    print('\n❌ Not authenticated!', 'red');
    print('Run: npx schema-icu setup\n', 'yellow');
    process.exit(1);
  }

  const config = client.getConfig();
  print(`\n✅ Authenticated as: ${config.email || 'Unknown'}`, 'green');
  print(`🎫 Tier: ${config.tier || 'Unknown'}\n`, 'green');

  printHelp();
  rl.prompt();
}

// Event handlers
rl.on('line', async (line) => {
  await handleCommand(line);
  rl.prompt();
}).on('close', () => {
  print('\n👋 Goodbye!\n', 'green');
  process.exit(0);
});

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  print('\n\n👋 Goodbye!\n', 'green');
  process.exit(0);
});

// Start CLI
start().catch(error => {
  print(`\n💥 Fatal Error: ${error.message}`, 'red');
  process.exit(1);
});
