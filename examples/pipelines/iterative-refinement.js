/**
 * Iterative Refinement Loop Example
 * 
 * Demonstrates using feedback loops to progressively improve code
 * through multiple iterations.
 */

const { SchemaICU } = require('@smartledger/schema-icu-sdk');

class RefinementLoop {
  constructor(schemaICU) {
    this.client = schemaICU;
  }

  async refine(initialQuery, iterations = 3, focusAreas = []) {
    console.log(`\n🔄 Starting Iterative Refinement Loop\n`);
    console.log(`Initial Query: ${initialQuery}`);
    console.log(`Iterations: ${iterations}`);
    console.log(`Focus Areas: ${focusAreas.join(', ') || 'general improvements'}\n`);
    console.log('='.repeat(70));

    let currentCode = null;
    let context = { language: 'javascript' };
    const history = [];

    // Initial generation
    console.log('\n📝 Iteration 0: Initial Code Generation');
    const startTime = Date.now();
    let result = await this.client.codeGenerator.generate(initialQuery, context);
    let duration = Date.now() - startTime;
    
    currentCode = result.data.code;
    
    console.log(`   ✅ Generated in ${duration}ms`);
    console.log(`   Reasoning: ${result.data.reasoning.substring(0, 100)}...`);
    if (result.data.missingContext && result.data.missingContext.length > 0) {
      console.log(`   Missing Context: ${result.data.missingContext.join(', ')}`);
    }

    history.push({ 
      iteration: 0, 
      code: currentCode, 
      reasoning: result.data.reasoning,
      complexity: result.data.complexity,
      duration
    });

    // Iterative improvement
    for (let i = 0; i < iterations; i++) {
      console.log(`\n🔧 Iteration ${i + 1}: Code Improvement`);
      
      const improvementQuery = focusAreas.length > 0
        ? `Optimize the code focusing on: ${focusAreas.join(', ')}`
        : `Further optimize for performance, readability, and best practices`;
      
      const startTime = Date.now();
      result = await this.client.codeImprover.improve(improvementQuery, {
        code: currentCode,
        language: 'javascript',
        focusAreas: focusAreas.length > 0 ? focusAreas : ['performance', 'readability', 'best-practices']
      });
      duration = Date.now() - startTime;

      currentCode = result.data.improvedCode;
      
      console.log(`   ✅ Improved in ${duration}ms`);
      console.log(`   Improvements Made: ${result.data.improvements?.length || 0}`);
      if (result.data.improvements) {
        result.data.improvements.slice(0, 3).forEach((improvement, idx) => {
          console.log(`      ${idx + 1}. ${improvement.substring(0, 60)}...`);
        });
      }

      history.push({
        iteration: i + 1,
        code: currentCode,
        improvements: result.data.improvements,
        reasoning: result.data.reasoning,
        duration
      });
    }

    console.log('\n' + '='.repeat(70));
    console.log(`\n✨ Refinement complete: ${iterations + 1} total iterations\n`);

    return { finalCode: currentCode, history };
  }

  printHistory(history) {
    console.log('\n📊 REFINEMENT HISTORY\n');
    console.log('='.repeat(70));
    
    let totalDuration = 0;
    history.forEach((entry) => {
      console.log(`\nIteration ${entry.iteration}:`);
      console.log(`  Duration: ${entry.duration}ms`);
      console.log(`  Code Length: ${entry.code.length} characters`);
      
      if (entry.complexity) {
        console.log(`  Complexity: ${entry.complexity}`);
      }
      
      if (entry.improvements && entry.improvements.length > 0) {
        console.log(`  Improvements: ${entry.improvements.length}`);
        entry.improvements.slice(0, 2).forEach((imp, idx) => {
          console.log(`    ${idx + 1}. ${imp.substring(0, 70)}...`);
        });
      }
      
      totalDuration += entry.duration;
    });

    console.log('\n' + '='.repeat(70));
    console.log(`\nTotal Refinement Time: ${totalDuration}ms`);
    console.log(`Average per Iteration: ${Math.round(totalDuration / history.length)}ms\n`);
  }

  async compareIterations(history) {
    console.log('\n🔍 ITERATION COMPARISON\n');
    console.log('='.repeat(70));
    
    for (let i = 1; i < history.length; i++) {
      console.log(`\nComparing Iteration ${i - 1} → ${i}:`);
      
      const prev = history[i - 1].code;
      const current = history[i].code;
      
      const result = await this.client.diffImprover.improve(current, {
        language: 'javascript',
        focusAreas: ['code-quality']
      });

      if (result.success && result.data.changes) {
        console.log(`  Changes detected: ${result.data.changes.length}`);
        result.data.changes.slice(0, 3).forEach((change, idx) => {
          console.log(`    ${idx + 1}. ${change.substring(0, 60)}...`);
        });
      }
      
      const lengthChange = current.length - prev.length;
      console.log(`  Size change: ${lengthChange > 0 ? '+' : ''}${lengthChange} characters`);
    }
  }
}

async function main() {
  const schemaICU = new SchemaICU();
  const refiner = new RefinementLoop(schemaICU);

  // Example 1: Refine a caching system
  console.log('\n' + '='.repeat(70));
  console.log('EXAMPLE 1: Caching System Refinement');
  console.log('='.repeat(70));

  const result1 = await refiner.refine(
    'Create an LRU cache implementation with TTL support',
    3,
    ['performance', 'memory-efficiency', 'type-safety']
  );

  refiner.printHistory(result1.history);
  await refiner.compareIterations(result1.history);

  // Example 2: Refine an API handler
  console.log('\n\n' + '='.repeat(70));
  console.log('EXAMPLE 2: API Handler Refinement');
  console.log('='.repeat(70));

  const result2 = await refiner.refine(
    'Create an Express middleware for request validation and sanitization',
    2,
    ['security', 'error-handling']
  );

  refiner.printHistory(result2.history);

  // Save results
  const fs = require('fs');
  const outputDir = './examples/pipelines/output';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    `${outputDir}/refinement-cache.js`,
    result1.finalCode
  );

  fs.writeFileSync(
    `${outputDir}/refinement-middleware.js`,
    result2.finalCode
  );

  fs.writeFileSync(
    `${outputDir}/refinement-history.json`,
    JSON.stringify({
      cache: result1.history,
      middleware: result2.history
    }, null, 2)
  );

  console.log(`\n\n💾 Results saved to ${outputDir}/`);
  console.log(`   - refinement-cache.js (final optimized code)`);
  console.log(`   - refinement-middleware.js (final optimized code)`);
  console.log(`   - refinement-history.json (full iteration history)\n`);
}

main().catch(console.error);
