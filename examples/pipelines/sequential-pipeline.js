/**
 * Sequential Pipeline Example
 * 
 * Demonstrates chaining agents in a linear workflow where each step
 * builds upon the previous one's output.
 */

const { SchemaICU } = require('@smartledger/schema-icu-sdk');

class SequentialPipeline {
  constructor(schemaICU) {
    this.client = schemaICU;
  }

  async execute(steps) {
    let context = {};
    let results = [];

    console.log(`\n🔗 Starting Sequential Pipeline with ${steps.length} steps...\n`);

    for (const step of steps) {
      console.log(`📍 Step ${results.length + 1}: ${step.name}`);
      console.log(`   Query: ${step.query.substring(0, 60)}...`);
      
      const { agent, method, query, contextBuilder } = step;
      
      // Build context from previous results
      const stepContext = contextBuilder ? contextBuilder(results, context) : context;
      
      // Execute agent
      const startTime = Date.now();
      const result = await agent[method](query, stepContext);
      const duration = Date.now() - startTime;
      
      if (result.success) {
        console.log(`   ✅ Completed in ${duration}ms\n`);
      } else {
        console.log(`   ❌ Failed: ${result.error}\n`);
        break;
      }
      
      // Accumulate results
      results.push({ step: step.name, result, duration });
      context[step.name] = result.data;
    }

    console.log(`\n✨ Pipeline completed: ${results.length}/${steps.length} steps successful\n`);
    return results;
  }

  printResults(results) {
    console.log('\n📊 PIPELINE RESULTS SUMMARY\n');
    console.log('='.repeat(60));
    
    results.forEach((item, index) => {
      console.log(`\nStep ${index + 1}: ${item.step}`);
      console.log(`Duration: ${item.duration}ms`);
      console.log('Output:', JSON.stringify(item.result.data, null, 2).substring(0, 200) + '...');
    });
  }
}

async function main() {
  const schemaICU = new SchemaICU();

  const pipeline = new SequentialPipeline(schemaICU);

  // Example: Build a REST API from scratch
  const results = await pipeline.execute([
    {
      name: 'plan',
      agent: schemaICU.projectPlanner,
      method: 'plan',
      query: 'Create a REST API for a book library management system',
      contextBuilder: () => ({ 
        technology: 'Node.js with Express', 
        experience: 'intermediate' 
      })
    },
    {
      name: 'schema',
      agent: schemaICU.schemaGenerator,
      method: 'generate',
      query: 'Generate database schema for book library with books, authors, users, and loans',
      contextBuilder: (results) => ({ 
        projectPlan: results[0].result.data 
      })
    },
    {
      name: 'api',
      agent: schemaICU.codeGenerator,
      method: 'generate',
      query: 'Generate Express.js REST API with CRUD endpoints for books and authors',
      contextBuilder: (results) => ({
        language: 'javascript',
        schema: results[1].result.data.schemaAsString,
        projectPlan: results[0].result.data
      })
    },
    {
      name: 'improve',
      agent: schemaICU.codeImprover,
      method: 'improve',
      query: 'Add input validation, error handling, and authentication middleware',
      contextBuilder: (results) => ({
        code: results[2].result.data.code,
        language: 'javascript',
        focusAreas: ['security', 'error-handling', 'validation']
      })
    },
    {
      name: 'tests',
      agent: schemaICU.codeGenerator,
      method: 'generate',
      query: 'Generate comprehensive Jest unit and integration tests',
      contextBuilder: (results) => ({
        language: 'javascript',
        apiCode: results[3].result.data.improvedCode
      })
    }
  ]);

  pipeline.printResults(results);

  // Save the final outputs
  const fs = require('fs');
  const outputDir = './examples/pipelines/output';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    `${outputDir}/sequential-pipeline-results.json`,
    JSON.stringify(results, null, 2)
  );

  console.log(`\n💾 Results saved to ${outputDir}/sequential-pipeline-results.json`);
}

main().catch(console.error);
