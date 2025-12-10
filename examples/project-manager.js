const { SchemaICU } = require('@smartledger/schema-icu-sdk');

/**
 * Project Manager - Uses Schema.ICU to help manage development projects
 */
class ProjectManager {
  constructor() {
    this.client = new SchemaICU();
  }

  /**
   * Create a comprehensive project plan
   */
  async createProjectPlan(projectDescription, options = {}) {
    console.log('📋 Creating project plan...\n');
    
    const result = await this.client.projectPlanner.plan(
      projectDescription,
      { technology: options.technology || 'Node.js', experience: options.experience || 'intermediate', ...options }
    );
    
    return result.success ? result.data : result;
  }

  /**
   * Generate code for a specific feature
   */
  async generateFeature(featureDescription, language = 'JavaScript') {
    console.log(`💻 Generating ${language} code for: ${featureDescription}\n`);
    
    const result = await this.client.codeGenerator.generate(
      featureDescription,
      { language }
    );
    
    return result.success ? result.data : result;
  }

  /**
   * Get terminal commands for project setup
   */
  async getSetupCommands(projectType, os = 'windows') {
    console.log('⚡ Generating setup commands...\n');
    
    const result = await this.client.terminalAgent.generate(
      `Setup commands for ${projectType} project`,
      { os, shell: 'bash' }
    );
    
    return result.success ? result.data : result;
  }

  /**
   * Generate API schema
   */
  async generateAPISchema(description) {
    console.log('📐 Creating API schema...\n');
    
    const result = await this.client.schemaGenerator.generate(description);
    
    return result.success ? result.data : result;
  }

  /**
   * Improve existing code
   */
  async improveCode(code, improvements = '', language = 'JavaScript') {
    console.log('✨ Improving code...\n');
    
    const focusAreas = improvements ? improvements.split(',').map(s => s.trim()) : ['readability', 'performance'];
    
    const result = await this.client.codeImprover.improve(
      improvements || 'Improve this code',
      { code, language, focusAreas }
    );
    
    return result.success ? result.data : result;
  }

  /**
   * Get GitHub workflow suggestions
   */
  async getGitHubWorkflow(task) {
    console.log('🔧 Getting GitHub commands...\n');
    
    const result = await this.client.githubAgent.generate(task);
    
    return result.success ? result.data : result;
  }

  /**
   * Ask a general question
   */
  async askQuestion(question) {
    console.log('🤔 Processing question...\n');
    
    const result = await this.client.base.query(question);
    
    return result.success ? result.data : result;
  }

  /**
   * Design a modular component
   */
  async designComponent(description) {
    console.log('🎨 Designing component...\n');
    
    const result = await this.client.boxDesigner.design(description);
    
    return result.success ? result.data : result;
  }

  /**
   * Improve a prompt
   */
  async improvePrompt(prompt) {
    console.log('📝 Improving prompt...\n');
    
    const result = await this.client.promptImprover.improve(prompt);
    
    return result.success ? result.data : result;
  }

  /**
   * Get code diff for improvements
   */
  async getCodeDiff(code, focusAreas = ['readability', 'performance'], language = 'JavaScript') {
    console.log('🔍 Generating code diff...\n');
    
    const result = await this.client.diffImprover.improve(code, { language, focusAreas });
    
    return result.success ? result.data : result;
  }

  /**
   * Recommend best agent for a task
   */
  async recommendAgent(task) {
    console.log('🎯 Recommending best agent...\n');
    
    const availableTools = [
      { name: 'codeGenerator', description: 'Generate production-ready code' },
      { name: 'schemaGenerator', description: 'Create JSON schemas' },
      { name: 'terminalAgent', description: 'Generate shell commands' },
      { name: 'codeImprover', description: 'Optimize existing code' },
      { name: 'diffImprover', description: 'Code improvements via diffs' },
      { name: 'boxDesigner', description: 'Design modular components' },
      { name: 'projectPlanner', description: 'Plan projects with estimates' },
      { name: 'promptImprover', description: 'Optimize prompts' },
      { name: 'githubAgent', description: 'Generate GitHub CLI commands' }
    ];
    
    const result = await this.client.toolChoice.recommend(task, { availableTools });
    
    return result.success ? result.data : result;
  }
}

// Example usage
async function demo() {
  const pm = new ProjectManager();

  console.log('🎯 PROJECT MANAGER DEMO\n');
  console.log('='.repeat(60) + '\n');

  // Example 1: Plan a project
  const projectPlan = await pm.createProjectPlan(
    'Build a REST API for a blog with posts, comments, and user authentication',
    { technology: 'Node.js, Express, MongoDB' }
  );
  console.log('Project Plan:');
  console.log('Name:', projectPlan.projectName);
  if (projectPlan.tasks) {
    console.log('Tasks:');
    projectPlan.tasks.forEach((t, i) => console.log(`  ${i+1}. ${t.taskName} (${t.estimatedTimeHours}h)`));
  }
  console.log('\n' + '='.repeat(60) + '\n');

  // Example 2: Generate a feature
  const authCode = await pm.generateFeature(
    'Create a JWT authentication middleware for Express.js',
    'JavaScript'
  );
  console.log('Auth Middleware:');
  console.log(authCode.code);
  console.log('\n' + '='.repeat(60) + '\n');

  // Example 3: Get setup commands
  const setupCmds = await pm.getSetupCommands('Node.js REST API with Express and MongoDB');
  console.log('Setup Commands:');
  console.log(setupCmds.code);
  console.log('\n' + '='.repeat(60) + '\n');

  // Example 4: Generate schema
  const apiSchema = await pm.generateAPISchema(
    'JSON schema for user profile API response with id (string), username (string), email (string), avatar (URL), and createdAt (date)'
  );
  console.log('API Schema:');
  console.log(apiSchema.schemaAsString || apiSchema.code);
  
  console.log('\n✅ Demo complete!');
}

// Run demo if executed directly
if (require.main === module) {
  demo().catch(console.error);
}

module.exports = ProjectManager;
