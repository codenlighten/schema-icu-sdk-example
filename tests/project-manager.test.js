const ProjectManager = require('../examples/project-manager');

/**
 * Unit Tests for ProjectManager class
 * 
 * Run: npm test
 */

describe('ProjectManager', () => {
  let pm;

  beforeEach(() => {
    pm = new ProjectManager();
  });

  describe('Initialization', () => {
    test('should create a ProjectManager instance', () => {
      expect(pm).toBeInstanceOf(ProjectManager);
      expect(pm.client).toBeDefined();
    });

    test('should have a Schema.ICU client', () => {
      expect(pm.client.isAuthenticated).toBeDefined();
      expect(typeof pm.client.isAuthenticated).toBe('function');
    });
  });

  describe('Code Generation', () => {
    test('generateFeature should return code', async () => {
      const result = await pm.generateFeature('Create a simple hello function');
      
      expect(result).toBeDefined();
      expect(result.code).toBeDefined();
      expect(typeof result.code).toBe('string');
      expect(result.code.length).toBeGreaterThan(0);
    }, 15000); // 15s timeout for API call

    test('generateFeature should accept language parameter', async () => {
      const result = await pm.generateFeature('Create a sum function', 'Python');
      
      expect(result).toBeDefined();
      expect(result.code).toBeDefined();
      // Python code should contain 'def' keyword
      expect(result.code.toLowerCase()).toContain('def');
    }, 15000);
  });

  describe('Project Planning', () => {
    test('createProjectPlan should return project with tasks', async () => {
      const result = await pm.createProjectPlan(
        'Build a simple todo app',
        { technology: 'Node.js', experience: 'beginner' }
      );
      
      expect(result).toBeDefined();
      expect(result.projectName).toBeDefined();
      expect(result.tasks).toBeDefined();
      expect(Array.isArray(result.tasks)).toBe(true);
      expect(result.tasks.length).toBeGreaterThan(0);
      
      // Verify task structure
      const firstTask = result.tasks[0];
      expect(firstTask.taskName).toBeDefined();
      expect(firstTask.taskDescription).toBeDefined();
      expect(firstTask.estimatedTimeHours).toBeDefined();
      expect(typeof firstTask.estimatedTimeHours).toBe('number');
    }, 20000);
  });

  describe('Schema Generation', () => {
    test('generateAPISchema should return JSON schema', async () => {
      const result = await pm.generateAPISchema(
        'User object with id, name, and email'
      );
      
      expect(result).toBeDefined();
      expect(result.schemaAsString || result.code).toBeDefined();
      const schema = result.schemaAsString || result.code;
      expect(typeof schema).toBe('string');
      expect(schema.length).toBeGreaterThan(0);
    }, 15000);
  });

  describe('Terminal Commands', () => {
    test('getSetupCommands should return command', async () => {
      const result = await pm.getSetupCommands('Node.js project');
      
      expect(result).toBeDefined();
      expect(result.code).toBeDefined();
      expect(typeof result.code).toBe('string');
    }, 15000);
  });

  describe('Code Improvement', () => {
    test('improveCode should return improved code', async () => {
      const originalCode = 'function add(a,b){return a+b}';
      const result = await pm.improveCode(originalCode, 'readability');
      
      expect(result).toBeDefined();
      expect(result.improvedCode || result.code).toBeDefined();
      const improved = result.improvedCode || result.code;
      expect(typeof improved).toBe('string');
      expect(improved.length).toBeGreaterThan(0);
    }, 15000);

    test('getCodeDiff should return diff', async () => {
      const code = 'const x = 1;\nconst y = 2;\nconsole.log(x + y);';
      const result = await pm.getCodeDiff(code);
      
      expect(result).toBeDefined();
      expect(result.diff || result.improvedCode || result.code).toBeDefined();
    }, 15000);
  });

  describe('Component Design', () => {
    test('designComponent should return component design', async () => {
      const result = await pm.designComponent('A simple counter component');
      
      expect(result).toBeDefined();
      expect(result.name).toBeDefined();
      expect(result.description).toBeDefined();
      expect(typeof result.name).toBe('string');
      expect(typeof result.description).toBe('string');
    }, 15000);
  });

  describe('Prompt Improvement', () => {
    test('improvePrompt should return better prompt', async () => {
      const result = await pm.improvePrompt('make a function');
      
      expect(result).toBeDefined();
      expect(result.improvedPrompt || result.code).toBeDefined();
      const improved = result.improvedPrompt || result.code;
      expect(typeof improved).toBe('string');
      expect(improved.length).toBeGreaterThan('make a function'.length);
    }, 15000);
  });

  describe('GitHub Commands', () => {
    test('getGitHubWorkflow should return commands', async () => {
      const result = await pm.getGitHubWorkflow('Create a new branch called feature/test');
      
      expect(result).toBeDefined();
      expect(result.githubCommands || result.code).toBeDefined();
    }, 15000);
  });

  describe('Agent Recommendation', () => {
    test('recommendAgent should suggest appropriate agent', async () => {
      const result = await pm.recommendAgent('I need to generate code');
      
      expect(result).toBeDefined();
      expect(result.chosenTool).toBeDefined();
      expect(typeof result.chosenTool).toBe('string');
      expect(result.reasoning).toBeDefined();
    }, 15000);
  });

  describe('General Queries', () => {
    test('askQuestion should return answer', async () => {
      const result = await pm.askQuestion('What is a REST API?');
      
      expect(result).toBeDefined();
      expect(result.code || result).toBeDefined();
    }, 15000);
  });
});

// Integration test
describe('ProjectManager Integration', () => {
  test('should complete full workflow: plan -> generate -> improve', async () => {
    const pm = new ProjectManager();
    
    // 1. Plan a simple project
    const plan = await pm.createProjectPlan('Simple calculator app');
    expect(plan.projectName).toBeDefined();
    expect(plan.tasks.length).toBeGreaterThan(0);
    
    // 2. Generate code for a feature
    const code = await pm.generateFeature('Create an add function');
    expect(code.code).toBeDefined();
    
    // 3. Improve the code
    const improved = await pm.improveCode(code.code, 'performance,readability');
    expect(improved.improvedCode || improved.code).toBeDefined();
    
  }, 45000); // 45s timeout for full workflow
});
