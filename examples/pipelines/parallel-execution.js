/**
 * Parallel Execution Example
 * 
 * Demonstrates executing multiple agents concurrently and merging results.
 * Ideal for independent tasks that can run simultaneously.
 */

const { SchemaICU } = require('@smartledger/schema-icu-sdk');

class ParallelPipeline {
  constructor(schemaICU) {
    this.client = schemaICU;
  }

  async executeParallel(tasks) {
    console.log(`\n⚡ Starting Parallel Execution with ${tasks.length} tasks\n`);
    console.log('='.repeat(70));

    const startTime = Date.now();

    // Execute all tasks in parallel
    const promises = tasks.map((task, index) => 
      this.executeTask(task, index)
    );

    const results = await Promise.all(promises);
    const totalDuration = Date.now() - startTime;
    
    console.log('\n' + '='.repeat(70));
    console.log(`\n✨ All tasks completed in ${totalDuration}ms (parallel execution)\n`);

    const sequentialEstimate = results.reduce((sum, r) => sum + r.duration, 0);
    console.log(`   Sequential would take: ~${sequentialEstimate}ms`);
    console.log(`   Time saved: ~${sequentialEstimate - totalDuration}ms (${Math.round((1 - totalDuration/sequentialEstimate) * 100)}% faster)\n`);

    return this.mergeResults(results, tasks);
  }

  async executeTask(task, index) {
    const { name, agent, method, query, context } = task;
    
    console.log(`📍 Task ${index + 1} (${name}): Starting...`);
    
    const startTime = Date.now();
    const result = await agent[method](query, context || {});
    const duration = Date.now() - startTime;

    if (result.success) {
      console.log(`   ✅ Task ${index + 1} (${name}): Completed in ${duration}ms`);
    } else {
      console.log(`   ❌ Task ${index + 1} (${name}): Failed`);
    }

    return {
      name,
      result: result.data,
      success: result.success,
      duration
    };
  }

  mergeResults(results, tasks) {
    const merged = {};
    
    results.forEach((result, index) => {
      const taskName = tasks[index].name;
      merged[taskName] = {
        data: result.result,
        duration: result.duration,
        success: result.success
      };
    });

    return merged;
  }

  printResults(merged) {
    console.log('\n📊 MERGED RESULTS\n');
    console.log('='.repeat(70));
    
    Object.entries(merged).forEach(([name, data]) => {
      console.log(`\n${name}:`);
      console.log(`  Status: ${data.success ? '✅ Success' : '❌ Failed'}`);
      console.log(`  Duration: ${data.duration}ms`);
      console.log(`  Output preview: ${JSON.stringify(data.data).substring(0, 100)}...`);
    });
  }
}

async function main() {
  const schemaICU = new SchemaICU();
  const parallel = new ParallelPipeline(schemaICU);

  // Example 1: Generate full-stack application components in parallel
  console.log('\n' + '='.repeat(70));
  console.log('EXAMPLE 1: Simple Code Generation (Parallel)');
  console.log('='.repeat(70));

  const components = await parallel.executeParallel([
    {
      name: 'debounce',
      agent: schemaICU.codeGenerator,
      method: 'generate',
      query: 'Create a simple debounce function',
      context: { language: 'javascript' }
    },
    {
      name: 'throttle',
      agent: schemaICU.codeGenerator,
      method: 'generate',
      query: 'Create a simple throttle function',
      context: { language: 'javascript' }
    },
    {
      name: 'memoize',
      agent: schemaICU.codeGenerator,
      method: 'generate',
      query: 'Create a simple memoize function',
      context: { language: 'javascript' }
    }
  ]);

  parallel.printResults(components);

  // Skip the second example to keep it simple
  console.log('\n\n✨ Demo complete!\n');

  // Save all results
  const fs = require('fs');
  const outputDir = './examples/pipelines/output';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save individual components
  if (components.debounce?.data?.code) {
    fs.writeFileSync(`${outputDir}/debounce.js`, components.debounce.data.code);
  }
  if (components.throttle?.data?.code) {
    fs.writeFileSync(`${outputDir}/throttle.js`, components.throttle.data.code);
  }
  if (components.memoize?.data?.code) {
    fs.writeFileSync(`${outputDir}/memoize.js`, components.memoize.data.code);
  }

  // Save full results
  fs.writeFileSync(
    `${outputDir}/parallel-execution-results.json`,
    JSON.stringify({ components }, null, 2)
  );

  console.log(`\n\n💾 Results saved to ${outputDir}/`);
  console.log(`   - debounce.js`);
  console.log(`   - throttle.js`);
  console.log(`   - memoize.js`);
  console.log(`   - parallel-execution-results.json (complete results)\n`);
}

main().catch(console.error);
