const { SchemaICU } = require('@smartledger/schema-icu-sdk');

/**
 * Demonstrates all 11 Schema.ICU agents
 */
async function demonstrateAllAgents() {
  const client = new SchemaICU();

  console.log('🎯 Schema.ICU - All 11 Agents Demo\n');
  console.log('='.repeat(50) + '\n');

  try {
    // 1. Base Agent (General Purpose)
    console.log('1️⃣ BASE AGENT - General purpose query');
    const baseResult = await client.base.query(
      'Explain what a closure is in JavaScript in one sentence'
    );
    console.log(JSON.stringify(baseResult.data, null, 2));
    console.log('Response:', baseResult.data.code || baseResult.data, '\n');

    // 2. Code Generator
    console.log('2️⃣ CODE GENERATOR');
    const codeGen = await client.codeGenerator.generate(
      'Create a function to validate email addresses',
      { language: 'JavaScript' }
    );
    console.log(JSON.stringify(codeGen.data, null, 2));
    console.log('Generated:', codeGen.data.code, '\n');

    // 3. Schema Generator
    console.log('3️⃣ SCHEMA GENERATOR');
    const schema = await client.schemaGenerator.generate(
      'Create schema for a user profile with name, email, and age (minimum 0)'
    );
    console.log(JSON.stringify(schema.data, null, 2));
    console.log('Schema:', schema.data.schemaAsString || schema.data.code, '\n');

    // 4. Terminal Agent
    console.log('4️⃣ TERMINAL AGENT');
    const termCmd = await client.terminalAgent.generate(
      'List all running Node.js processes',
      { os: 'windows', shell: 'bash' }
    );
    console.log(JSON.stringify(termCmd.data, null, 2));
    console.log('Command:', termCmd.data.command, '\n');

    // 5. Code Improver
    console.log('5️⃣ CODE IMPROVER');
    const improved = await client.codeImprover.improve(
      'Add type safety and error handling',
      { code: 'function add(a,b){return a+b}', language: 'JavaScript' }
    );
    console.log(JSON.stringify(improved.data, null, 2));
    console.log('Improved:', improved.data.improvedCode || improved.data.code, '\n');

    // 6. Diff Improver
    console.log('6️⃣ DIFF IMPROVER');
    const diff = await client.diffImprover.improve(
      'const x = 1;\nconst y = 2;\nconsole.log(x + y);',
      { language: 'JavaScript', focusAreas: ['readability', 'modern syntax'] }
    );
    console.log(JSON.stringify(diff.data, null, 2));
    console.log('Diff:', diff.data.diff || diff.data.improvedCode || diff.data.code, '\n');

    // 7. Box Designer
    console.log('7️⃣ BOX DESIGNER');
    const box = await client.boxDesigner.design(
      'Design a modular authentication component following Alan Kay principles'
    );
    console.log(JSON.stringify(box.data, null, 2));
    console.log('Design:', box.data.name);
    console.log('Description:', box.data.description);
    console.log('Inputs:', box.data.inputs?.length || 0);
    console.log('Outputs:', box.data.outputs?.length || 0, '\n');

    // 8. Project Planner
    console.log('8️⃣ PROJECT PLANNER');
    const plan = await client.projectPlanner.plan(
      'Build a task management API with user authentication',
      { technology: 'Node.js, Express', experience: 'intermediate' }
    );
    console.log('Project:', plan.data.projectName);
    if (plan.data.tasks) {
      console.log('Tasks:', plan.data.tasks.length);
      plan.data.tasks.slice(0, 3).forEach((t, i) => {
        console.log(`  ${i+1}. ${t.taskName} (${t.estimatedTimeHours}h)`);
      });
    }
    console.log();

    // 9. Prompt Improver
    console.log('9️⃣ PROMPT IMPROVER');
    const prompt = await client.promptImprover.improve(
      'make a function'
    );
    console.log('Original:', 'make a function');
    console.log('Improved:', prompt.data.improvedPrompt || prompt.data.code, '\n');

    // 10. Tool Choice
    console.log('🔟 TOOL CHOICE');
    const tool = await client.toolChoice.recommend(
      'I need to generate a REST API endpoint',
      {
        availableTools: [
          { name: 'codeGenerator', description: 'Generate production-ready code' },
          { name: 'schemaGenerator', description: 'Create JSON schemas' },
          { name: 'terminalAgent', description: 'Generate shell commands' },
          { name: 'projectPlanner', description: 'Plan projects with estimates' }
        ]
      }
    );
    console.log('Chosen tool:', tool.data.chosenTool);
    console.log('Reasoning:', tool.data.reasoning.substring(0, 100) + '...');
    if (tool.data.alternativeTools) {
      console.log('Alternatives:', tool.data.alternativeTools.map(a => a.tool).join(', '));
    }
    console.log();

    // 11. GitHub Agent
    console.log('1️⃣1️⃣ GITHUB AGENT');
    const github = await client.githubAgent.generate(
      'Create a new branch called feature/new-ui using GitHub CLI'
    );
    if (github.data.githubCommands) {
      console.log('Commands:');
      github.data.githubCommands.slice(0, 2).forEach(cmd => {
        console.log(`  ${cmd.command}`);
      });
    } else {
      console.log('Command:', github.data.code);
    }
    console.log();

    console.log('='.repeat(50));
    console.log('✅ All agents tested successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  }
}

demonstrateAllAgents();
