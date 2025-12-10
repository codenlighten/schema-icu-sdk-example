/**
 * Full-Stack Application Generator
 * 
 * Combines multiple patterns to create a complete application from a single description.
 * Demonstrates sequential pipelines, parallel execution, and context accumulation.
 */

const { SchemaICU } = require('@smartledger/schema-icu-sdk');
const fs = require('fs');
const path = require('path');

class FullStackGenerator {
  constructor(schemaICU) {
    this.client = schemaICU;
  }

  async generate(appDescription, options = {}) {
    const {
      technology = 'Node.js, React, PostgreSQL',
      experience = 'intermediate',
      includeTests = true,
      includeDeployment = true,
      includeDocs = true
    } = options;

    console.log('\n' + '='.repeat(70));
    console.log('🚀 FULL-STACK APPLICATION GENERATOR');
    console.log('='.repeat(70));
    console.log(`\nApp: ${appDescription}`);
    console.log(`Tech Stack: ${technology}`);
    console.log(`Experience Level: ${experience}\n`);

    const startTime = Date.now();
    const results = {};

    // Step 1: Create detailed project plan
    console.log('📋 Step 1/9: Planning project architecture...');
    const planStart = Date.now();
    const plan = await this.client.projectPlanner.plan(appDescription, {
      technology,
      experience
    });
    results.plan = { data: plan.data, duration: Date.now() - planStart };
    console.log(`   ✅ Plan created with ${plan.data.tasks?.length || 0} tasks (${results.plan.duration}ms)\n`);

    // Step 2: Generate database schema
    console.log('💾 Step 2/9: Designing database schema...');
    const schemaStart = Date.now();
    const schema = await this.client.schemaGenerator.generate(
      `Generate comprehensive database schema for: ${appDescription}`,
      { projectPlan: plan.data }
    );
    results.schema = { data: schema.data, duration: Date.now() - schemaStart };
    console.log(`   ✅ Database schema generated (${results.schema.duration}ms)\n`);

    // Step 3: Parallel generation of backend services
    console.log('⚙️  Step 3/9: Generating backend services (parallel execution)...');
    const backendStart = Date.now();
    const [api, auth, middleware] = await Promise.all([
      this.client.codeGenerator.generate('Generate REST API endpoints with full CRUD operations', {
        language: 'javascript',
        schema: schema.data.schemaAsString,
        plan: plan.data
      }),
      this.client.codeGenerator.generate('Generate authentication system with JWT, refresh tokens, and session management', {
        language: 'javascript',
        schema: schema.data.schemaAsString
      }),
      this.client.codeGenerator.generate('Generate Express middleware for request validation, error handling, and logging', {
        language: 'javascript'
      })
    ]);
    const backendDuration = Date.now() - backendStart;
    results.backend = {
      api: api.data,
      auth: auth.data,
      middleware: middleware.data,
      duration: backendDuration
    };
    console.log(`   ✅ Backend services generated (${backendDuration}ms)\n`);

    // Step 4: Improve backend code
    console.log('🔧 Step 4/9: Optimizing backend code...');
    const improveStart = Date.now();
    const improvedAPI = await this.client.codeImprover.improve(
      'Add comprehensive error handling, input validation, security best practices, and performance optimizations',
      {
        code: api.data.code,
        language: 'javascript',
        focusAreas: ['security', 'error-handling', 'performance', 'validation']
      }
    );
    results.improvedBackend = { data: improvedAPI.data, duration: Date.now() - improveStart };
    console.log(`   ✅ Backend optimized with ${improvedAPI.data.improvements?.length || 0} improvements (${results.improvedBackend.duration}ms)\n`);

    // Step 5: Generate frontend
    console.log('🎨 Step 5/9: Generating React frontend...');
    const frontendStart = Date.now();
    const frontend = await this.client.codeGenerator.generate(
      'Generate React components with TypeScript, state management, API integration, and responsive design',
      {
        language: 'typescript',
        apiEndpoints: improvedAPI.data.improvedCode,
        plan: plan.data
      }
    );
    results.frontend = { data: frontend.data, duration: Date.now() - frontendStart };
    console.log(`   ✅ Frontend generated (${results.frontend.duration}ms)\n`);

    // Step 6: Generate tests (if enabled)
    if (includeTests) {
      console.log('🧪 Step 6/9: Generating test suites (parallel execution)...');
      const testsStart = Date.now();
      const [backendTests, frontendTests, integrationTests] = await Promise.all([
        this.client.codeGenerator.generate('Generate comprehensive Jest unit tests with mocking and edge cases', {
          language: 'javascript',
          code: improvedAPI.data.improvedCode
        }),
        this.client.codeGenerator.generate('Generate React Testing Library tests with user interaction scenarios', {
          language: 'typescript',
          code: frontend.data.code
        }),
        this.client.codeGenerator.generate('Generate end-to-end integration tests', {
          language: 'javascript',
          apiCode: improvedAPI.data.improvedCode,
          frontendCode: frontend.data.code
        })
      ]);
      const testsDuration = Date.now() - testsStart;
      results.tests = {
        backend: backendTests.data,
        frontend: frontendTests.data,
        integration: integrationTests.data,
        duration: testsDuration
      };
      console.log(`   ✅ Test suites generated (${testsDuration}ms)\n`);
    } else {
      console.log('⏭️  Step 6/9: Skipping tests (disabled)\n');
    }

    // Step 7: Generate deployment configuration (if enabled)
    if (includeDeployment) {
      console.log('🐳 Step 7/9: Creating deployment configurations...');
      const deployStart = Date.now();
      const deployment = await this.client.terminalAgent.generate(
        'Generate Docker, docker-compose, and Kubernetes configurations for production deployment',
        {
          os: 'linux',
          shell: 'bash',
          projectStructure: plan.data
        }
      );
      results.deployment = { data: deployment.data, duration: Date.now() - deployStart };
      console.log(`   ✅ Deployment configs created (${results.deployment.duration}ms)\n`);
    } else {
      console.log('⏭️  Step 7/9: Skipping deployment configs (disabled)\n');
    }

    // Step 8: Generate CI/CD pipeline (if deployment enabled)
    if (includeDeployment) {
      console.log('🔄 Step 8/9: Setting up CI/CD pipeline...');
      const cicdStart = Date.now();
      const cicd = await this.client.githubAgent.generate(
        'Generate GitHub Actions workflow with testing, linting, security scanning, and automated deployment',
        {
          tests: includeTests ? [results.tests.backend, results.tests.frontend] : [],
          deployment: results.deployment.data
        }
      );
      results.cicd = { data: cicd.data, duration: Date.now() - cicdStart };
      console.log(`   ✅ CI/CD pipeline configured (${results.cicd.duration}ms)\n`);
    } else {
      console.log('⏭️  Step 8/9: Skipping CI/CD (disabled)\n');
    }

    // Step 9: Generate documentation (if enabled)
    if (includeDocs) {
      console.log('📚 Step 9/9: Creating comprehensive documentation...');
      const docsStart = Date.now();
      const docs = await this.client.codeGenerator.generate(
        'Generate comprehensive README with setup instructions, API documentation, architecture diagrams, and contribution guidelines',
        {
          language: 'markdown',
          project: plan.data,
          api: improvedAPI.data,
          deployment: includeDeployment ? results.deployment.data : null
        }
      );
      results.documentation = { data: docs.data, duration: Date.now() - docsStart };
      console.log(`   ✅ Documentation generated (${results.documentation.duration}ms)\n`);
    } else {
      console.log('⏭️  Step 9/9: Skipping documentation (disabled)\n');
    }

    const totalDuration = Date.now() - startTime;

    console.log('='.repeat(70));
    console.log(`\n🎉 Full-stack application generation complete!\n`);
    console.log(`Total Time: ${totalDuration}ms (${(totalDuration / 1000).toFixed(2)}s)\n`);

    return {
      metadata: {
        appDescription,
        technology,
        experience,
        totalDuration,
        timestamp: new Date().toISOString()
      },
      ...results
    };
  }

  printSummary(results) {
    console.log('\n📊 GENERATION SUMMARY\n');
    console.log('='.repeat(70));
    
    const steps = [
      { name: 'Project Plan', key: 'plan' },
      { name: 'Database Schema', key: 'schema' },
      { name: 'Backend Services', key: 'backend' },
      { name: 'Backend Optimization', key: 'improvedBackend' },
      { name: 'Frontend', key: 'frontend' },
      { name: 'Test Suites', key: 'tests' },
      { name: 'Deployment Config', key: 'deployment' },
      { name: 'CI/CD Pipeline', key: 'cicd' },
      { name: 'Documentation', key: 'documentation' }
    ];

    steps.forEach((step, index) => {
      if (results[step.key]) {
        console.log(`\nStep ${index + 1}: ${step.name}`);
        console.log(`  Duration: ${results[step.key].duration}ms`);
        console.log(`  Status: ✅ Complete`);
      }
    });

    console.log('\n' + '='.repeat(70));
  }

  async saveToProject(results, projectName) {
    const baseDir = path.join('./examples/pipelines/output', projectName);
    
    // Create directory structure
    const dirs = [
      baseDir,
      `${baseDir}/backend`,
      `${baseDir}/frontend`,
      `${baseDir}/tests`,
      `${baseDir}/deployment`,
      `${baseDir}/.github/workflows`
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // Save backend files
    if (results.improvedBackend?.data?.improvedCode) {
      fs.writeFileSync(`${baseDir}/backend/api.js`, results.improvedBackend.data.improvedCode);
    }
    if (results.backend?.auth?.code) {
      fs.writeFileSync(`${baseDir}/backend/auth.js`, results.backend.auth.code);
    }
    if (results.backend?.middleware?.code) {
      fs.writeFileSync(`${baseDir}/backend/middleware.js`, results.backend.middleware.code);
    }

    // Save frontend
    if (results.frontend?.data?.code) {
      fs.writeFileSync(`${baseDir}/frontend/App.tsx`, results.frontend.data.code);
    }

    // Save schema
    if (results.schema?.data?.schemaAsString) {
      fs.writeFileSync(`${baseDir}/schema.prisma`, results.schema.data.schemaAsString);
    }

    // Save tests
    if (results.tests) {
      if (results.tests.backend?.code) {
        fs.writeFileSync(`${baseDir}/tests/backend.test.js`, results.tests.backend.code);
      }
      if (results.tests.frontend?.code) {
        fs.writeFileSync(`${baseDir}/tests/frontend.test.tsx`, results.tests.frontend.code);
      }
    }

    // Save documentation
    if (results.documentation?.data?.code) {
      fs.writeFileSync(`${baseDir}/README.md`, results.documentation.data.code);
    }

    // Save CI/CD
    if (results.cicd?.data?.githubCommands) {
      const workflow = results.cicd.data.githubCommands
        .map(cmd => `# ${cmd.reasoning}\n${cmd.command}`)
        .join('\n\n');
      fs.writeFileSync(`${baseDir}/.github/workflows/main.yml`, workflow);
    }

    // Save complete results JSON
    fs.writeFileSync(
      `${baseDir}/generation-results.json`,
      JSON.stringify(results, null, 2)
    );

    console.log(`\n💾 Project saved to: ${baseDir}/\n`);
    return baseDir;
  }
}

async function main() {
  const schemaICU = new SchemaICU();
  const generator = new FullStackGenerator(schemaICU);

  // Example: Generate a complete application
  const results = await generator.generate(
    'A social media platform for developers to share code snippets, collaborate on projects, and get feedback from the community',
    {
      technology: 'Node.js with Express, React with TypeScript, PostgreSQL with Prisma',
      experience: 'advanced',
      includeTests: true,
      includeDeployment: true,
      includeDocs: true
    }
  );

  generator.printSummary(results);
  
  const projectPath = await generator.saveToProject(results, 'dev-social-platform');
  
  console.log('📦 Generated Files:');
  console.log('   - backend/api.js (optimized REST API)');
  console.log('   - backend/auth.js (JWT authentication)');
  console.log('   - backend/middleware.js (validation & error handling)');
  console.log('   - frontend/App.tsx (React application)');
  console.log('   - schema.prisma (database schema)');
  console.log('   - tests/backend.test.js (backend tests)');
  console.log('   - tests/frontend.test.tsx (frontend tests)');
  console.log('   - README.md (comprehensive documentation)');
  console.log('   - .github/workflows/main.yml (CI/CD pipeline)');
  console.log('   - generation-results.json (complete metadata)\n');
}

main().catch(console.error);
