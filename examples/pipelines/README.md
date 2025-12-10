# Agent Pipeline Examples

This directory contains working examples demonstrating advanced agent chaining and composition patterns using the Schema.ICU SDK.

## 🚀 Quick Start

```bash
# Run any example
npm run pipeline:sequential
npm run pipeline:router
npm run pipeline:refine
npm run pipeline:parallel
npm run pipeline:fullstack
```

## 📋 Examples

### 1. Sequential Pipeline (`sequential-pipeline.js`)

Chains agents in a linear workflow where each step builds upon the previous one's output.

**Pattern**: Plan → Schema → Code → Improve → Test

**Use Case**: Building a REST API from scratch with iterative refinement

**Key Features**:
- Context accumulation across steps
- Progress tracking
- Result history

```bash
npm run pipeline:sequential
```

**Output**: Complete REST API with database schema, optimized code, and tests

---

### 2. Smart Router (`smart-router.js`)

Uses the `toolChoice` agent to dynamically select the best agent for each task.

**Pattern**: Task → Agent Recommendation → Dynamic Execution

**Use Case**: Auto-routing diverse development tasks to appropriate agents

**Key Features**:
- Intelligent agent selection
- Reasoning transparency
- Alternative suggestions
- Usage statistics

```bash
npm run pipeline:router
```

**Output**: Workflow results with agent selection reasoning and performance metrics

---

### 3. Iterative Refinement (`iterative-refinement.js`)

Progressive code improvement through multiple feedback loops.

**Pattern**: Generate → Improve → Improve → Improve...

**Use Case**: Optimizing code quality through iterative enhancement

**Key Features**:
- Multiple improvement iterations
- Focus area targeting
- Improvement tracking
- Code diff comparison

```bash
npm run pipeline:refine
```

**Output**: Highly optimized code with complete refinement history

---

### 4. Parallel Execution (`parallel-execution.js`)

Executes multiple agents concurrently for independent tasks.

**Pattern**: [Task1, Task2, Task3...] → Parallel Execution → Merged Results

**Use Case**: Generating full-stack components or microservices simultaneously

**Key Features**:
- Concurrent execution
- Time savings measurement
- Result merging
- Performance comparison

```bash
npm run pipeline:parallel
```

**Output**: Complete component set with significant time savings vs sequential

---

### 5. Full-Stack Generator (`fullstack-generator.js`)

Combines multiple patterns to create complete applications from a single description.

**Pattern**: Sequential + Parallel + Context Accumulation

**Use Case**: End-to-end application generation with complete project structure

**Key Features**:
- 9-step generation pipeline
- Configurable options
- File system output
- Comprehensive project structure

```bash
npm run pipeline:fullstack
```

**Output**: Complete application with:
- Backend API & auth
- Frontend React app
- Database schema
- Test suites
- Deployment configs
- CI/CD pipeline
- Documentation

---

## 📊 Output Structure

All examples save results to `examples/pipelines/output/`:

```
output/
├── sequential-pipeline-results.json
├── smart-router-results.json
├── refinement-cache.js
├── refinement-middleware.js
├── refinement-history.json
├── frontend-component.tsx
├── backend-routes.js
├── database-schema.prisma
├── parallel-execution-results.json
└── [project-name]/
    ├── backend/
    ├── frontend/
    ├── tests/
    ├── deployment/
    ├── .github/workflows/
    ├── schema.prisma
    ├── README.md
    └── generation-results.json
```

## 🎯 Pattern Selection Guide

| Use Case | Recommended Pattern | Example |
|----------|-------------------|---------|
| Building feature step-by-step | Sequential Pipeline | REST API development |
| Unknown task types | Smart Router | Mixed development tasks |
| Code optimization | Iterative Refinement | Performance tuning |
| Independent components | Parallel Execution | Microservices generation |
| Complete application | Full-Stack Generator | New project setup |

## 🔧 Customization

### Sequential Pipeline

```javascript
const results = await pipeline.execute([
  {
    name: 'your_step',
    agent: schemaICU.yourAgent,
    method: 'yourMethod',
    query: 'Your query here',
    contextBuilder: (results, context) => ({
      // Build context from previous results
    })
  }
]);
```

### Smart Router

```javascript
const router = new SmartRouter(schemaICU);
const result = await router.route('Your task', { 
  /* context */ 
});
```

### Iterative Refinement

```javascript
const refiner = new RefinementLoop(schemaICU);
const result = await refiner.refine(
  'Your initial query',
  3, // iterations
  ['performance', 'security'] // focus areas
);
```

### Parallel Execution

```javascript
const results = await parallel.executeParallel([
  { name: 'task1', agent: agent1, method: 'generate', query: 'Query 1' },
  { name: 'task2', agent: agent2, method: 'generate', query: 'Query 2' }
]);
```

### Full-Stack Generator

```javascript
const results = await generator.generate(
  'Your app description',
  {
    technology: 'Your tech stack',
    experience: 'beginner|intermediate|advanced',
    includeTests: true,
    includeDeployment: true,
    includeDocs: true
  }
);
```

## 📈 Performance Metrics

Each example tracks:
- **Execution time** per step/task
- **Total duration** of pipeline
- **Time savings** (parallel vs sequential)
- **Success rate** across steps

## 🧪 Testing

All examples include:
- Error handling
- Result validation
- Progress logging
- Output persistence

## 💡 Best Practices

1. **Context Management**: Pass relevant subset of data to avoid token bloat
2. **Error Handling**: Implement retry logic for failed steps
3. **Parallel Optimization**: Identify independent tasks for concurrent execution
4. **Result Persistence**: Save intermediate results for debugging
5. **Progress Tracking**: Log each step for visibility

## 🔗 Advanced Patterns

For more complex patterns, see `AGENT_CHAINING_PATTERNS.md`:
- Visual Pipeline Builder (Roblox-style)
- DAG (Directed Acyclic Graph) Execution
- Custom workflow engines
- Multi-agent collaboration patterns

## 📝 Notes

- All examples use the Schema.ICU SDK with credentials from `.env`
- Output files are automatically created in `output/` directory
- Results include cryptographic signatures for verification
- Each pattern is production-ready and can be integrated into applications

## 🤝 Contributing

To add new pipeline patterns:
1. Create a new file in `examples/pipelines/`
2. Follow the existing pattern structure
3. Add npm script to `package.json`
4. Update this README

## 📚 Resources

- [Schema.ICU Documentation](https://schema.icu)
- [Agent Chaining Patterns](../../AGENT_CHAINING_PATTERNS.md)
- [Customer Guide](../../CUSTOMER_GUIDE.md)
- [Main README](../../README.md)
