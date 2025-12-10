const { SchemaICU } = require('@smartledger/schema-icu-sdk');

async function main() {
  // SDK automatically loads credentials from .env
  const client = new SchemaICU();

  // Check authentication
  if (!client.isAuthenticated()) {
    console.error('❌ Not authenticated. Please run: npx schema-icu setup');
    console.error('   Or ensure your .env file contains valid credentials.');
    process.exit(1);
  }

  console.log('🚀 Testing Schema.ICU SDK...\n');

  try {
    // Test 1: Code Generator
    console.log('1️⃣ Testing Code Generator...');
    const codeResult = await client.codeGenerator.generate(
      'Create a debounce function with 300ms default delay',
      { language: 'JavaScript' }
    );
    if (codeResult.success) {
      console.log('✅ Generated code:\n' + codeResult.data.code);
      console.log('📝 Reasoning:', codeResult.data.reasoning);
      console.log('🔐 Cryptographically signed:', !!codeResult.signature, '\n');
    }

    // Test 2: Project Planner
    console.log('2️⃣ Testing Project Planner...');
    const planResult = await client.projectPlanner.plan(
      'Build a simple todo list app with real-time updates',
      { technology: 'Node.js, React, WebSocket', experience: 'intermediate' }
    );
    if (planResult.success) {
      console.log('✅ Project:', planResult.data.projectName);
      console.log('📋 Tasks:', planResult.data.tasks?.length || 0);
      if (planResult.data.tasks) {
        planResult.data.tasks.forEach((task, i) => {
          console.log(`   ${i+1}. ${task.taskName} (${task.estimatedTimeHours}h)`);
        });
      }
      console.log();
    }

    // Test 3: Terminal Agent
    console.log('3️⃣ Testing Terminal Agent...');
    const terminalResult = await client.terminalAgent.generate(
      'Find all JavaScript files modified in the last 7 days',
      { os: 'windows', shell: 'bash' }
    );
    if (terminalResult.success) {
      console.log('✅ Command:', terminalResult.data.code);
      console.log('📝 Reasoning:', terminalResult.data.reasoning, '\n');
    }

    console.log('🎉 All tests passed! SDK is working correctly.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
    console.error('Full error:', error);
  }
}

main();
