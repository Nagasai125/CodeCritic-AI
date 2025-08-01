// Shared types between frontend and backend

export interface CodeAnalysisRequest {
  code: string;
  language: string;
  filename?: string;
  modelProvider?: ModelProvider;
  analysisType?: AnalysisType[];
}

export interface CodeAnalysisResponse {
  issues: CodeIssue[];
  suggestions: RefactorSuggestion[];
  metrics: CodeMetrics;
  processingTime: number;
  modelUsed: string;
}

export interface CodeIssue {
  id: string;
  type: IssueType;
  severity: IssueSeverity;
  message: string;
  description?: string;
  location: CodeLocation;
  suggestedFix?: string;
  ruleId?: string;
}

export interface RefactorSuggestion {
  id: string;
  title: string;
  description: string;
  type: RefactorType;
  location: CodeLocation;
  originalCode: string;
  refactoredCode: string;
  confidence: number;
  impact: RefactorImpact;
}

export interface CodeLocation {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
}

export interface CodeMetrics {
  linesOfCode: number;
  cyclomaticComplexity: number;
  maintainabilityIndex: number;
  technicalDebt: number;
  testCoverage?: number;
}

export type ModelProvider = 'gemini';

export type AnalysisType = 
  | 'syntax' 
  | 'security' 
  | 'performance' 
  | 'maintainability' 
  | 'best-practices';

export type IssueType = 
  | 'syntax-error' 
  | 'security-vulnerability' 
  | 'performance-issue' 
  | 'code-smell' 
  | 'bug-risk' 
  | 'style-violation';

export type IssueSeverity = 'error' | 'warning' | 'info';

export type RefactorType = 
  | 'extract-function' 
  | 'rename-variable' 
  | 'simplify-expression' 
  | 'remove-duplication' 
  | 'optimize-performance' 
  | 'improve-readability';

export type RefactorImpact = 'low' | 'medium' | 'high';

export interface ModelConfig {
  provider: ModelProvider;
  model: string;
  apiKey?: string;
  baseUrl?: string;
  maxTokens?: number;
  temperature?: number;
}