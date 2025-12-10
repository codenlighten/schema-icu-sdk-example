# Agent Chaining & Pipeline Patterns

## Overview

The Schema.ICU SDK's guaranteed JSON structure and context objects enable powerful agent composition patterns. This document explores architectural patterns for chaining multiple agents together to create sophisticated multi-agent workflows.

## Core Concepts

### 1. Output-to-Input Piping

Every agent returns a standardized response structure:
```javascript
{
  success: true,
  data: { /* agent-specific structure */ },
  timestamp: "2025-12-09T...",
  signature: { hash, signature, publicKey, signedAt }
}
```

The `data` object can be:
- **Stringified** and passed as the query to the next agent
- **Added to context** object for richer semantic understanding
- **Extracted** for specific fields to compose new queries

### 2. Context Accumulation

Each agent accepts an optional context object:
```javascript
agent.generate(query, { 
  language: 'javascript',
  previousResults: {...},
  projectContext: {...}
})
```

This enables **stateful pipelines** where each agent builds upon previous work.

## Pattern Catalog

### Pattern 1: Sequential Pipeline

Chain agents in a linear workflow where each step depends on the previous.

```javascript
class SequentialPipeline {
  constructor(schemaICU) {
    this.client = schemaICU;
  }

  async execute(steps) {
    let context = {};
    let results = [];

    for (const step of steps) {
      const { agent, method, query, contextBuilder } = step;
      
      // Build context from previous results
      const stepContext = contextBuilder ? contextBuilder(results, context) : context;
      
      // Execute agent
      const result = await agent[method](query, stepContext);
      
      // Accumulate results
      results.push({ step: step.name, result });
      context[step.name] = result.data;
    }

    return results;
  }
}

// Example: Full-stack app generation
const pipeline = new SequentialPipeline(schemaICU);
await pipeline.execute([
  {
    name: 'plan',
    agent: schemaICU.projectPlanner,
    method: 'plan',
    query: 'Create a task management REST API',
    contextBuilder: () => ({ technology: 'Node.js', experience: 'intermediate' })
  },
  {
    name: 'schema',
    agent: schemaICU.schemaGenerator,
    method: 'generate',
    query: 'Generate database schema for task management API',
    contextBuilder: (results) => ({ 
      projectPlan: results[0].result.data 
    })
  },
  {
    name: 'api',
    agent: schemaICU.codeGenerator,
    method: 'generate',
    query: 'Generate Express.js REST API endpoints',
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
    query: 'Add authentication and rate limiting',
    contextBuilder: (results) => ({
      code: results[2].result.data.code,
      language: 'javascript',
      focusAreas: ['security', 'performance']
    })
  },
  {
    name: 'tests',
    agent: schemaICU.codeGenerator,
    method: 'generate',
    query: 'Generate Jest tests for the API',
    contextBuilder: (results) => ({
      language: 'javascript',
      apiCode: results[3].result.data.improvedCode
    })
  }
]);
```

### Pattern 2: Smart Routing with Agent Recommendation

Use `toolChoice` agent to dynamically select the best agent for each task.

```javascript
class SmartRouter {
  constructor(schemaICU) {
    this.client = schemaICU;
    this.agentMap = {
      'Code Generator': schemaICU.codeGenerator,
      'Schema Generator': schemaICU.schemaGenerator,
      'Code Improver': schemaICU.codeImprover,
      'Project Planner': schemaICU.projectPlanner,
      'Terminal Agent': schemaICU.terminalAgent,
      'GitHub Agent': schemaICU.githubAgent,
      'Box Designer': schemaICU.boxDesigner,
      'Prompt Improver': schemaICU.promptImprover
    };
  }

  async route(task, context = {}) {
    // Ask toolChoice which agent to use
    const recommendation = await this.client.toolChoice.recommend(
      task,
      { availableTools: Object.keys(this.agentMap) }
    );

    const chosenAgentName = recommendation.data.chosenTool;
    const agent = this.agentMap[chosenAgentName];

    console.log(`Routing to: ${chosenAgentName}`);
    console.log(`Reasoning: ${recommendation.data.reasoning}`);

    // Execute with the recommended agent
    return await this.executeAgent(agent, chosenAgentName, task, context);
  }

  async executeAgent(agent, agentName, task, context) {
    // Determine the method based on agent type
    const methodMap = {
      'Code Generator': 'generate',
      'Schema Generator': 'generate',
      'Code Improver': 'improve',
      'Project Planner': 'plan',
      'Box Designer': 'design',
      'Prompt Improver': 'improve',
      'Terminal Agent': 'generate',
      'GitHub Agent': 'generate'
    };

    const method = methodMap[agentName];
    return await agent[method](task, context);
  }
}

// Example: Auto-routing workflow
const router = new SmartRouter(schemaICU);

const tasks = [
  'Create a plan for a chat application',
  'Generate TypeScript code for a WebSocket server',
  'Design a message queue system',
  'Improve this code for better error handling'
];

for (const task of tasks) {
  const result = await router.route(task);
  console.log(`Task: ${task}`);
  console.log(`Result:`, result.data);
}
```

### Pattern 3: Iterative Refinement Loop

Use feedback loops to progressively improve outputs.

```javascript
class RefinementLoop {
  constructor(schemaICU) {
    this.client = schemaICU;
  }

  async refine(initialQuery, iterations = 3) {
    let currentCode = null;
    let context = { language: 'javascript' };
    const history = [];

    // Initial generation
    let result = await this.client.codeGenerator.generate(initialQuery, context);
    currentCode = result.data.code;
    history.push({ iteration: 0, code: currentCode, reasoning: result.data.reasoning });

    // Iterative improvement
    for (let i = 0; i < iterations; i++) {
      const improvementQuery = `Iteration ${i + 1}: Further optimize for performance and readability`;
      
      result = await this.client.codeImprover.improve(improvementQuery, {
        code: currentCode,
        language: 'javascript',
        focusAreas: ['performance', 'readability', 'best-practices']
      });

      currentCode = result.data.improvedCode;
      history.push({
        iteration: i + 1,
        code: currentCode,
        improvements: result.data.improvements,
        reasoning: result.data.reasoning
      });
    }

    return { finalCode: currentCode, history };
  }
}

// Example usage
const refiner = new RefinementLoop(schemaICU);
const result = await refiner.refine('Create a caching layer with LRU eviction');
console.log('Final optimized code:', result.finalCode);
console.log('Improvement history:', result.history);
```

### Pattern 4: Parallel Execution with Merge

Execute multiple agents concurrently and merge results.

```javascript
class ParallelPipeline {
  constructor(schemaICU) {
    this.client = schemaICU;
  }

  async executeParallel(tasks) {
    const promises = tasks.map(task => 
      this.executeTask(task.agent, task.method, task.query, task.context)
    );

    const results = await Promise.all(promises);
    
    return this.mergeResults(results, tasks);
  }

  async executeTask(agent, method, query, context) {
    return await agent[method](query, context);
  }

  mergeResults(results, tasks) {
    const merged = {};
    
    results.forEach((result, index) => {
      const taskName = tasks[index].name;
      merged[taskName] = result.data;
    });

    return merged;
  }
}

// Example: Generate multiple components simultaneously
const parallel = new ParallelPipeline(schemaICU);

const components = await parallel.executeParallel([
  {
    name: 'frontend',
    agent: schemaICU.codeGenerator,
    method: 'generate',
    query: 'Create a React component for user profile',
    context: { language: 'typescript' }
  },
  {
    name: 'backend',
    agent: schemaICU.codeGenerator,
    method: 'generate',
    query: 'Create Express route handlers for user profile',
    context: { language: 'javascript' }
  },
  {
    name: 'database',
    agent: schemaICU.schemaGenerator,
    method: 'generate',
    query: 'Create Prisma schema for user profile'
  },
  {
    name: 'tests',
    agent: schemaICU.codeGenerator,
    method: 'generate',
    query: 'Create integration tests for user profile endpoints',
    context: { language: 'javascript' }
  }
]);

console.log('Generated components:', components);
```

### Pattern 5: Visual Pipeline Builder (Roblox-Style)

Create a node-based visual programming interface for agent workflows.

```javascript
class PipelineNode {
  constructor(id, agentName, method, config = {}) {
    this.id = id;
    this.agentName = agentName;
    this.method = method;
    this.config = config; // query, context builders, transformers
    this.inputs = [];
    this.outputs = [];
  }

  connectTo(node) {
    this.outputs.push(node);
    node.inputs.push(this);
  }

  async execute(schemaICU, inputData = {}) {
    // Build query from config and input data
    const query = typeof this.config.query === 'function'
      ? this.config.query(inputData)
      : this.config.query;

    // Build context from input data
    const context = this.config.contextBuilder
      ? this.config.contextBuilder(inputData)
      : inputData;

    // Get the agent
    const agent = schemaICU[this.agentName];
    
    // Execute
    const result = await agent[this.method](query, context);

    // Transform output if needed
    return this.config.transformer
      ? this.config.transformer(result.data, inputData)
      : result.data;
  }
}

class VisualPipeline {
  constructor(schemaICU) {
    this.client = schemaICU;
    this.nodes = new Map();
    this.startNode = null;
  }

  addNode(node) {
    this.nodes.set(node.id, node);
    return node;
  }

  setStart(nodeId) {
    this.startNode = this.nodes.get(nodeId);
  }

  async execute() {
    if (!this.startNode) throw new Error('No start node defined');

    const executed = new Set();
    const results = new Map();

    // Topological execution (simple DFS for now)
    await this.executeNode(this.startNode, executed, results);

    return Object.fromEntries(results);
  }

  async executeNode(node, executed, results) {
    if (executed.has(node.id)) return;

    // Gather input data from connected inputs
    const inputData = {};
    for (const inputNode of node.inputs) {
      await this.executeNode(inputNode, executed, results);
      inputData[inputNode.id] = results.get(inputNode.id);
    }

    // Execute this node
    const result = await node.execute(this.client, inputData);
    results.set(node.id, result);
    executed.add(node.id);

    // Execute downstream nodes
    for (const outputNode of node.outputs) {
      await this.executeNode(outputNode, executed, results);
    }
  }
}

// Example: Build a visual pipeline
const pipeline = new VisualPipeline(schemaICU);

// Node 1: Plan the project
const planNode = pipeline.addNode(new PipelineNode(
  'plan',
  'projectPlanner',
  'plan',
  {
    query: 'Create a REST API for a blog',
    contextBuilder: () => ({ technology: 'Node.js', experience: 'advanced' })
  }
));

// Node 2: Generate schema (depends on plan)
const schemaNode = pipeline.addNode(new PipelineNode(
  'schema',
  'schemaGenerator',
  'generate',
  {
    query: (inputs) => `Generate database schema based on: ${JSON.stringify(inputs.plan)}`,
    contextBuilder: (inputs) => ({ projectPlan: inputs.plan })
  }
));

// Node 3: Generate API code (depends on plan and schema)
const apiNode = pipeline.addNode(new PipelineNode(
  'api',
  'codeGenerator',
  'generate',
  {
    query: 'Generate Express.js REST API',
    contextBuilder: (inputs) => ({
      language: 'javascript',
      schema: inputs.schema?.schemaAsString,
      plan: inputs.plan
    })
  }
));

// Node 4: Generate tests (depends on API)
const testNode = pipeline.addNode(new PipelineNode(
  'tests',
  'codeGenerator',
  'generate',
  {
    query: (inputs) => 'Generate comprehensive tests',
    contextBuilder: (inputs) => ({
      language: 'javascript',
      apiCode: inputs.api?.code
    })
  }
));

// Connect the nodes
planNode.connectTo(schemaNode);
planNode.connectTo(apiNode);
schemaNode.connectTo(apiNode);
apiNode.connectTo(testNode);

// Set start node
pipeline.setStart('plan');

// Execute the entire pipeline
const results = await pipeline.execute();
console.log('Pipeline results:', results);
```

### Pattern 6: DAG (Directed Acyclic Graph) Execution

Advanced workflow engine supporting complex dependencies and parallel execution.

```javascript
class DAGExecutor {
  constructor(schemaICU) {
    this.client = schemaICU;
  }

  async execute(dag) {
    const results = new Map();
    const executing = new Map();
    const completed = new Set();

    // Find nodes with no dependencies
    const roots = dag.nodes.filter(node => 
      !node.dependencies || node.dependencies.length === 0
    );

    // Execute all roots in parallel
    await Promise.all(roots.map(node => 
      this.executeNode(node, dag, results, executing, completed)
    ));

    return Object.fromEntries(results);
  }

  async executeNode(node, dag, results, executing, completed) {
    // Check if already completed or executing
    if (completed.has(node.id)) return;
    if (executing.has(node.id)) {
      await executing.get(node.id);
      return;
    }

    // Create execution promise
    const executionPromise = (async () => {
      // Wait for all dependencies
      if (node.dependencies && node.dependencies.length > 0) {
        const depNodes = node.dependencies.map(depId => 
          dag.nodes.find(n => n.id === depId)
        );
        
        await Promise.all(depNodes.map(depNode => 
          this.executeNode(depNode, dag, results, executing, completed)
        ));
      }

      // Gather dependency results
      const depResults = {};
      if (node.dependencies) {
        node.dependencies.forEach(depId => {
          depResults[depId] = results.get(depId);
        });
      }

      // Build context
      const context = node.contextBuilder 
        ? node.contextBuilder(depResults)
        : depResults;

      // Execute agent
      const agent = this.client[node.agent];
      const result = await agent[node.method](node.query, context);

      // Store result
      results.set(node.id, result.data);
      completed.add(node.id);

      return result.data;
    })();

    executing.set(node.id, executionPromise);
    await executionPromise;
    executing.delete(node.id);
  }
}

// Example: Complex DAG workflow
const executor = new DAGExecutor(schemaICU);

const dag = {
  nodes: [
    {
      id: 'project_plan',
      agent: 'projectPlanner',
      method: 'plan',
      query: 'Create a microservices e-commerce platform',
      contextBuilder: () => ({ technology: 'Node.js, React, PostgreSQL', experience: 'expert' })
    },
    {
      id: 'auth_service',
      agent: 'codeGenerator',
      method: 'generate',
      query: 'Generate authentication microservice',
      dependencies: ['project_plan'],
      contextBuilder: (deps) => ({ 
        language: 'javascript',
        projectPlan: deps.project_plan 
      })
    },
    {
      id: 'product_service',
      agent: 'codeGenerator',
      method: 'generate',
      query: 'Generate product catalog microservice',
      dependencies: ['project_plan'],
      contextBuilder: (deps) => ({ 
        language: 'javascript',
        projectPlan: deps.project_plan 
      })
    },
    {
      id: 'order_service',
      agent: 'codeGenerator',
      method: 'generate',
      query: 'Generate order processing microservice',
      dependencies: ['project_plan', 'auth_service'],
      contextBuilder: (deps) => ({ 
        language: 'javascript',
        projectPlan: deps.project_plan,
        authService: deps.auth_service
      })
    },
    {
      id: 'frontend',
      agent: 'codeGenerator',
      method: 'generate',
      query: 'Generate React frontend',
      dependencies: ['auth_service', 'product_service', 'order_service'],
      contextBuilder: (deps) => ({ 
        language: 'typescript',
        services: [deps.auth_service, deps.product_service, deps.order_service]
      })
    },
    {
      id: 'docker_setup',
      agent: 'terminalAgent',
      method: 'generate',
      query: 'Generate Docker Compose setup',
      dependencies: ['auth_service', 'product_service', 'order_service'],
      contextBuilder: (deps) => ({ 
        os: 'linux',
        services: Object.keys(deps)
      })
    },
    {
      id: 'ci_cd',
      agent: 'githubAgent',
      method: 'generate',
      query: 'Generate GitHub Actions CI/CD pipeline',
      dependencies: ['docker_setup'],
      contextBuilder: (deps) => ({ 
        dockerSetup: deps.docker_setup 
      })
    }
  ]
};

const results = await executor.execute(dag);
console.log('DAG execution complete:', Object.keys(results));
```

## Real-World Example: Full Application Generator

Combining patterns to create a complete application.

```javascript
class FullStackGenerator {
  constructor(schemaICU) {
    this.client = schemaICU;
  }

  async generate(appDescription) {
    console.log('🚀 Generating full-stack application...\n');

    // Step 1: Create detailed project plan
    console.log('📋 Step 1: Planning project architecture...');
    const plan = await this.client.projectPlanner.plan(appDescription, {
      technology: 'Node.js, React, PostgreSQL',
      experience: 'intermediate'
    });
    console.log(`✅ Created plan with ${plan.data.tasks.length} tasks\n`);

    // Step 2: Generate database schema
    console.log('💾 Step 2: Designing database schema...');
    const schema = await this.client.schemaGenerator.generate(
      `Generate database schema for: ${appDescription}`,
      { projectPlan: plan.data }
    );
    console.log('✅ Database schema generated\n');

    // Step 3: Parallel generation of backend services
    console.log('⚙️  Step 3: Generating backend services...');
    const [api, auth, middleware] = await Promise.all([
      this.client.codeGenerator.generate('Generate REST API endpoints', {
        language: 'javascript',
        schema: schema.data.schemaAsString,
        plan: plan.data
      }),
      this.client.codeGenerator.generate('Generate authentication system with JWT', {
        language: 'javascript',
        schema: schema.data.schemaAsString
      }),
      this.client.codeGenerator.generate('Generate Express middleware for validation and error handling', {
        language: 'javascript'
      })
    ]);
    console.log('✅ Backend services generated\n');

    // Step 4: Improve backend code
    console.log('🔧 Step 4: Optimizing backend code...');
    const improvedAPI = await this.client.codeImprover.improve(
      'Add comprehensive error handling, input validation, and security best practices',
      {
        code: api.data.code,
        language: 'javascript',
        focusAreas: ['security', 'error-handling', 'performance']
      }
    );
    console.log('✅ Backend optimized\n');

    // Step 5: Generate frontend
    console.log('🎨 Step 5: Generating React frontend...');
    const frontend = await this.client.codeGenerator.generate(
      'Generate React components and API integration',
      {
        language: 'typescript',
        apiEndpoints: improvedAPI.data.improvedCode,
        plan: plan.data
      }
    );
    console.log('✅ Frontend generated\n');

    // Step 6: Generate tests
    console.log('🧪 Step 6: Generating test suites...');
    const [backendTests, frontendTests] = await Promise.all([
      this.client.codeGenerator.generate('Generate comprehensive Jest tests', {
        language: 'javascript',
        code: improvedAPI.data.improvedCode
      }),
      this.client.codeGenerator.generate('Generate React Testing Library tests', {
        language: 'typescript',
        code: frontend.data.code
      })
    ]);
    console.log('✅ Tests generated\n');

    // Step 7: Generate deployment configuration
    console.log('🐳 Step 7: Creating deployment configs...');
    const deployment = await this.client.terminalAgent.generate(
      'Generate Docker and Docker Compose setup for the application',
      {
        os: 'linux',
        shell: 'bash',
        projectStructure: plan.data
      }
    );
    console.log('✅ Deployment configs created\n');

    // Step 8: Generate CI/CD pipeline
    console.log('🔄 Step 8: Setting up CI/CD pipeline...');
    const cicd = await this.client.githubAgent.generate(
      'Generate GitHub Actions workflow for testing and deployment',
      {
        tests: [backendTests.data, frontendTests.data],
        deployment: deployment.data
      }
    );
    console.log('✅ CI/CD pipeline configured\n');

    // Step 9: Generate documentation
    console.log('📚 Step 9: Creating documentation...');
    const docs = await this.client.codeGenerator.generate(
      'Generate comprehensive README with setup instructions, API documentation, and architecture overview',
      {
        language: 'markdown',
        project: plan.data,
        api: improvedAPI.data
      }
    );
    console.log('✅ Documentation generated\n');

    console.log('🎉 Full-stack application generation complete!\n');

    return {
      plan: plan.data,
      schema: schema.data,
      backend: {
        api: improvedAPI.data,
        auth: auth.data,
        middleware: middleware.data,
        tests: backendTests.data
      },
      frontend: {
        components: frontend.data,
        tests: frontendTests.data
      },
      deployment: deployment.data,
      cicd: cicd.data,
      documentation: docs.data
    };
  }
}

// Example usage
const generator = new FullStackGenerator(schemaICU);
const app = await generator.generate(
  'A social media platform for developers to share code snippets and collaborate'
);

console.log('Generated application structure:', Object.keys(app));
```

## Best Practices

### 1. **Context Management**
- Accumulate context progressively through the pipeline
- Pass relevant subset of previous results to avoid token bloat
- Use context builders to transform data appropriately for each agent

### 2. **Error Handling**
- Implement retry logic with exponential backoff
- Validate agent responses before passing to next stage
- Provide fallback strategies for failed pipeline steps

### 3. **Performance Optimization**
- Identify independent tasks and execute in parallel
- Cache intermediate results for reusable pipelines
- Use streaming for large outputs when possible

### 4. **Testing Pipelines**
- Unit test individual pipeline steps
- Integration test full pipeline execution
- Mock agent responses for faster testing

### 5. **Monitoring & Debugging**
- Log each step's input/output for debugging
- Track execution time per agent
- Store pipeline execution history for analysis

## Conclusion

The Schema.ICU SDK's architecture enables powerful multi-agent workflows that can:
- **Automate complex development tasks** end-to-end
- **Adapt intelligently** using agent recommendation
- **Scale horizontally** with parallel execution
- **Maintain context** across multiple transformation steps
- **Compose visually** using node-based programming patterns

These patterns transform the SDK from individual agent calls into a comprehensive application generation and automation platform.
