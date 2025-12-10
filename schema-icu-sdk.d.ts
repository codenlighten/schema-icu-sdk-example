/**
 * TypeScript type definitions for @smartledger/schema-icu-sdk
 * 
 * Usage: Add this file to your project for TypeScript autocomplete and type checking
 */

declare module '@smartledger/schema-icu-sdk' {
  /**
   * Configuration for Schema.ICU client
   */
  export interface SchemaICUConfig {
    apiKey?: string;
    jwtToken?: string;
    email?: string;
    baseUrl?: string;
    port?: number;
    tier?: 'free' | 'registered' | 'professional' | 'enterprise';
  }

  /**
   * Base response structure from all agents
   */
  export interface SchemaICUResponse<T = any> {
    success: boolean;
    data: T;
    timestamp: string;
    signature: {
      hash: string;
      signature: string;
      publicKey: string;
      signedAt: string;
    };
  }

  /**
   * Code Generator response data
   */
  export interface CodeGeneratorData {
    code: string;
    missingContext: string[];
    reasoning: string;
    language: string;
    complexity: string;
  }

  /**
   * Schema Generator response data
   */
  export interface SchemaGeneratorData {
    schemaAsString: string;
    code?: string;
    missingContext: string[];
  }

  /**
   * Terminal Agent response data
   */
  export interface TerminalAgentData {
    code: string;
    reasoning: string;
    missingContext: string[];
  }

  /**
   * Code Improver response data
   */
  export interface CodeImproverData {
    improvedCode: string;
    code?: string;
    missingContext: string[];
  }

  /**
   * Diff Improver response data
   */
  export interface DiffImproverData {
    diff: string;
    improvedCode: string;
    explanation?: string;
    missingContext: string[];
  }

  /**
   * Box Designer component input/output
   */
  export interface BoxIO {
    name: string;
    type: string;
    description: string;
  }

  /**
   * Box Designer response data
   */
  export interface BoxDesignerData {
    name: string;
    description: string;
    inputs: BoxIO[];
    outputs: BoxIO[];
    dependencies: string[];
  }

  /**
   * Project task with time estimate
   */
  export interface ProjectTask {
    taskName: string;
    taskDescription: string;
    estimatedTimeHours: number;
  }

  /**
   * Project Planner response data
   */
  export interface ProjectPlannerData {
    projectName: string;
    projectDescription: string;
    tasks: ProjectTask[];
  }

  /**
   * Prompt Improver response data
   */
  export interface PromptImproverData {
    improvedPrompt: string;
    code?: string;
    missingContext: string[];
  }

  /**
   * Tool Choice available tool
   */
  export interface AvailableTool {
    name: string;
    description: string;
  }

  /**
   * Tool Choice alternative tool
   */
  export interface AlternativeTool {
    tool: string;
    index: number;
    score: number;
    rationale: string;
  }

  /**
   * Tool Choice response data
   */
  export interface ToolChoiceData {
    chosenTool: string;
    chosenToolIndex: number;
    isAgent: boolean;
    shouldInvokeTool: boolean;
    missingContext: string[];
    reasoning: string;
    alternativeTools: AlternativeTool[];
  }

  /**
   * GitHub command with reasoning
   */
  export interface GitHubCommand {
    command: string;
    reasoning: string;
  }

  /**
   * GitHub Agent response data
   */
  export interface GitHubAgentData {
    githubCommands: GitHubCommand[];
    code?: string;
    missingContext: string[];
  }

  /**
   * Base Agent response data
   */
  export interface BaseAgentData {
    code: string;
    missingContext: string[];
  }

  /**
   * Base Agent interface
   */
  export interface BaseAgent {
    query(query: string): Promise<SchemaICUResponse<BaseAgentData>>;
  }

  /**
   * Code Generator Agent interface
   */
  export interface CodeGeneratorAgent {
    generate(
      query: string,
      context?: { language?: string; [key: string]: any }
    ): Promise<SchemaICUResponse<CodeGeneratorData>>;
  }

  /**
   * Schema Generator Agent interface
   */
  export interface SchemaGeneratorAgent {
    generate(query: string): Promise<SchemaICUResponse<SchemaGeneratorData>>;
  }

  /**
   * Terminal Agent interface
   */
  export interface TerminalAgent {
    generate(
      query: string,
      context?: { os?: string; shell?: string; [key: string]: any }
    ): Promise<SchemaICUResponse<TerminalAgentData>>;
  }

  /**
   * Code Improver Agent interface
   */
  export interface CodeImproverAgent {
    improve(
      query: string,
      context: { code: string; language?: string; focusAreas?: string[]; [key: string]: any }
    ): Promise<SchemaICUResponse<CodeImproverData>>;
  }

  /**
   * Diff Improver Agent interface
   */
  export interface DiffImproverAgent {
    improve(
      code: string,
      context?: { language?: string; focusAreas?: string[]; [key: string]: any }
    ): Promise<SchemaICUResponse<DiffImproverData>>;
  }

  /**
   * Box Designer Agent interface
   */
  export interface BoxDesignerAgent {
    design(query: string): Promise<SchemaICUResponse<BoxDesignerData>>;
  }

  /**
   * Project Planner Agent interface
   */
  export interface ProjectPlannerAgent {
    plan(
      query: string,
      context?: { technology?: string; experience?: string; team_size?: number; [key: string]: any }
    ): Promise<SchemaICUResponse<ProjectPlannerData>>;
  }

  /**
   * Prompt Improver Agent interface
   */
  export interface PromptImproverAgent {
    improve(prompt: string): Promise<SchemaICUResponse<PromptImproverData>>;
  }

  /**
   * Tool Choice Agent interface
   */
  export interface ToolChoiceAgent {
    recommend(
      query: string,
      context: { availableTools: AvailableTool[]; [key: string]: any }
    ): Promise<SchemaICUResponse<ToolChoiceData>>;
  }

  /**
   * GitHub Agent interface
   */
  export interface GitHubAgent {
    generate(query: string): Promise<SchemaICUResponse<GitHubAgentData>>;
  }

  /**
   * Main Schema.ICU client
   */
  export class SchemaICU {
    constructor(config?: SchemaICUConfig);

    /**
     * Check if client is authenticated
     */
    isAuthenticated(): boolean;

    /**
     * Get current configuration
     */
    getConfig(): SchemaICUConfig;

    /**
     * Update configuration
     */
    updateConfig(config: Partial<SchemaICUConfig>): void;

    /**
     * Base agent for general queries
     */
    base: BaseAgent;

    /**
     * Code generation agent
     */
    codeGenerator: CodeGeneratorAgent;

    /**
     * JSON schema generation agent
     */
    schemaGenerator: SchemaGeneratorAgent;

    /**
     * Terminal command generation agent
     */
    terminalAgent: TerminalAgent;

    /**
     * Code improvement agent
     */
    codeImprover: CodeImproverAgent;

    /**
     * Diff-based code improvement agent
     */
    diffImprover: DiffImproverAgent;

    /**
     * Modular component design agent
     */
    boxDesigner: BoxDesignerAgent;

    /**
     * Project planning agent
     */
    projectPlanner: ProjectPlannerAgent;

    /**
     * Prompt improvement agent
     */
    promptImprover: PromptImproverAgent;

    /**
     * Tool/agent recommendation agent
     */
    toolChoice: ToolChoiceAgent;

    /**
     * GitHub CLI command generation agent
     */
    githubAgent: GitHubAgent;
  }
}
