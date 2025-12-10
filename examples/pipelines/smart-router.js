/**
 * Smart Router Example
 * 
 * Uses the toolChoice agent to dynamically select the best agent
 * for each task in the workflow.
 */

const { SchemaICU } = require('@smartledger/schema-icu-sdk');

class SmartRouter {
  constructor(schemaICU) {
    this.client = schemaICU;
    this.agentMap = {
      'Code Generator': { agent: schemaICU.codeGenerator, method: 'generate' },
      'Schema Generator': { agent: schemaICU.schemaGenerator, method: 'generate' },
      'Code Improver': { agent: schemaICU.codeImprover, method: 'improve' },
      'Project Planner': { agent: schemaICU.projectPlanner, method: 'plan' },
      'Terminal Agent': { agent: schemaICU.terminalAgent, method: 'generate' },
      'GitHub Agent': { agent: schemaICU.githubAgent, method: 'generate' },
      'Box Designer': { agent: schemaICU.boxDesigner, method: 'design' },
      'Prompt Improver': { agent: schemaICU.promptImprover, method: 'improve' }
    };
  }

  async route(task, context = {}) {
    console.log(`\n🤔 Analyzing task: "${task.substring(0, 60)}..."`);
    
    // Ask toolChoice which agent to use
    const recommendation = await this.client.toolChoice.recommend(
      task,
      { availableTools: Object.keys(this.agentMap) }
    );

    if (!recommendation.success) {
      throw new Error(`Routing failed: ${recommendation.error}`);
    }

    const chosenAgentName = recommendation.data.chosenTool;
    const { agent, method } = this.agentMap[chosenAgentName];

    console.log(`\n✨ Recommended Agent: ${chosenAgentName}`);
    console.log(`   Reasoning: ${recommendation.data.reasoning}`);
    
    if (recommendation.data.alternativeTools && recommendation.data.alternativeTools.length > 0) {
      console.log(`   Alternatives: ${recommendation.data.alternativeTools.join(', ')}`);
    }

    // Execute with the recommended agent
    console.log(`\n⚙️  Executing with ${chosenAgentName}...`);
    const startTime = Date.now();
    const result = await agent[method](task, context);
    const duration = Date.now() - startTime;

    if (result.success) {
      console.log(`   ✅ Completed in ${duration}ms`);
    }

    return {
      task,
      agentUsed: chosenAgentName,
      reasoning: recommendation.data.reasoning,
      result: result.data,
      duration
    };
  }

  async routeWorkflow(tasks) {
    console.log(`\n🚀 Starting Smart Router Workflow with ${tasks.length} tasks...\n`);
    console.log('='.repeat(70));

    const results = [];
    let accumulatedContext = {};

    for (const task of tasks) {
      const result = await this.route(task, accumulatedContext);
      results.push(result);
      
      // Accumulate context for next task
      accumulatedContext[`task_${results.length}`] = result.result;
    }

    console.log('\n' + '='.repeat(70));
    console.log(`\n✨ Workflow complete: ${results.length} tasks routed and executed\n`);

    return results;
  }

  printWorkflowSummary(results) {
    console.log('\n📊 SMART ROUTING SUMMARY\n');
    console.log('='.repeat(70));
    
    const agentUsage = {};
    let totalDuration = 0;

    results.forEach((item, index) => {
      console.log(`\nTask ${index + 1}: ${item.task.substring(0, 50)}...`);
      console.log(`Agent: ${item.agentUsed}`);
      console.log(`Duration: ${item.duration}ms`);
      console.log(`Reasoning: ${item.reasoning.substring(0, 80)}...`);
      
      agentUsage[item.agentUsed] = (agentUsage[item.agentUsed] || 0) + 1;
      totalDuration += item.duration;
    });

    console.log('\n' + '='.repeat(70));
    console.log('\nAgent Usage Statistics:');
    Object.entries(agentUsage).forEach(([agent, count]) => {
      console.log(`  ${agent}: ${count} tasks`);
    });
    console.log(`\nTotal Duration: ${totalDuration}ms`);
  }
}

async function main() {
  const schemaICU = new SchemaICU();
  const router = new SmartRouter(schemaICU);

  // Example: Auto-routing diverse development tasks
  const tasks = [
    'Create a detailed plan for building a real-time chat application with WebSocket support',
    'Generate TypeScript code for a WebSocket server with room management',
    'Design a message queue component that handles offline message delivery',
    'What terminal commands do I need to set up a Node.js project with TypeScript?',
    'Create a GitHub Actions workflow for automated testing and deployment',
    'Generate a Prisma schema for chat users, messages, and rooms',
    'Improve this authentication code to add rate limiting and better error handling'
  ];

  const results = await router.routeWorkflow(tasks);
  router.printWorkflowSummary(results);

  // Save results
  const fs = require('fs');
  const outputDir = './examples/pipelines/output';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    `${outputDir}/smart-router-results.json`,
    JSON.stringify(results, null, 2)
  );

  console.log(`\n💾 Results saved to ${outputDir}/smart-router-results.json\n`);
}

main().catch(console.error);
