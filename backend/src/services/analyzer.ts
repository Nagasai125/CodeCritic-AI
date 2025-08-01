import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { CodeAnalysisRequest, CodeAnalysisResponse, CodeIssue, RefactorSuggestion, CodeMetrics } from '../../../shared/types.js';

const ANALYSIS_PROMPT = PromptTemplate.fromTemplate(`
You are an expert code reviewer. Analyze the following {language} code and provide detailed feedback.

Code to analyze:
{code}

Please provide your analysis in the following JSON format:
{{
  "issues": [
    {{
      "type": "syntax-error|security-vulnerability|performance-issue|code-smell|bug-risk|style-violation",
      "severity": "error|warning|info",
      "message": "Brief description of the issue",
      "description": "Detailed explanation",
      "startLine": number,
      "startColumn": number,
      "endLine": number,
      "endColumn": number,
      "suggestedFix": "How to fix this issue"
    }}
  ],
  "suggestions": [
    {{
      "title": "Brief title",
      "description": "Detailed description",
      "type": "extract-function|rename-variable|simplify-expression|remove-duplication|optimize-performance|improve-readability",
      "startLine": number,
      "startColumn": number,
      "endLine": number,
      "endColumn": number,
      "originalCode": "code snippet",
      "refactoredCode": "improved code snippet",
      "confidence": 0.0-1.0,
      "impact": "low|medium|high"
    }}
  ]
}}

Focus on: {analysisTypes}
Provide practical, actionable feedback.
`);

function createGeminiModel() {
  console.log('Creating Gemini model with API key:', process.env.GOOGLE_API_KEY ? 'Present' : 'Missing');
  return new ChatGoogleGenerativeAI({
    modelName: 'gemini-pro',
    temperature: 0.1,
    maxOutputTokens: 2000,
    apiKey: process.env.GOOGLE_API_KEY,
  });
}

function calculateMetrics(code: string): CodeMetrics {
  const lines = code.split('\n');
  const linesOfCode = lines.filter(line => line.trim().length > 0).length;
  
  // Simple complexity calculation based on control structures
  const complexityKeywords = /\b(if|else|while|for|switch|case|catch|&&|\|\|)\b/g;
  const matches = code.match(complexityKeywords);
  const cyclomaticComplexity = matches ? matches.length + 1 : 1;
  
  // Basic maintainability index calculation
  const maintainabilityIndex = Math.max(0, Math.min(100, 171 - 5.2 * Math.log(linesOfCode) - 0.23 * cyclomaticComplexity));
  
  // Technical debt estimation (hours)
  const technicalDebt = Math.max(0, (cyclomaticComplexity - 10) * 0.5 + (linesOfCode > 50 ? (linesOfCode - 50) * 0.01 : 0));
  
  return {
    linesOfCode,
    cyclomaticComplexity,
    maintainabilityIndex: Math.round(maintainabilityIndex),
    technicalDebt: Math.round(technicalDebt * 10) / 10
  };
}

export async function analyzeCode(request: CodeAnalysisRequest): Promise<CodeAnalysisResponse> {
  const startTime = Date.now();
  
  try {
    const model = createGeminiModel();
    const analysisTypes = request.analysisType?.join(', ') || 'general code quality';
    
    const prompt = await ANALYSIS_PROMPT.format({
      language: request.language,
      code: request.code,
      analysisTypes
    });
    
    console.log('Sending request to Gemini...');
    const response = await model.invoke(prompt);
    console.log('Received response from Gemini');
    const content = response.content as string;
    
    // Parse AI response
    let aiAnalysis;
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aiAnalysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.warn('Failed to parse AI response, using fallback analysis');
      aiAnalysis = { issues: [], suggestions: [] };
    }
    
    // Convert AI response to our format
    const issues: CodeIssue[] = (aiAnalysis.issues || []).map((issue: any, index: number) => ({
      id: `issue-${index}`,
      type: issue.type || 'code-smell',
      severity: issue.severity || 'info',
      message: issue.message || 'Code analysis issue',
      description: issue.description,
      location: {
        startLine: issue.startLine || 1,
        startColumn: issue.startColumn || 1,
        endLine: issue.endLine || 1,
        endColumn: issue.endColumn || 1
      },
      suggestedFix: issue.suggestedFix
    }));
    
    const suggestions: RefactorSuggestion[] = (aiAnalysis.suggestions || []).map((suggestion: any, index: number) => ({
      id: `suggestion-${index}`,
      title: suggestion.title || 'Refactor suggestion',
      description: suggestion.description || 'Consider refactoring this code',
      type: suggestion.type || 'improve-readability',
      location: {
        startLine: suggestion.startLine || 1,
        startColumn: suggestion.startColumn || 1,
        endLine: suggestion.endLine || 1,
        endColumn: suggestion.endColumn || 1
      },
      originalCode: suggestion.originalCode || '',
      refactoredCode: suggestion.refactoredCode || '',
      confidence: suggestion.confidence || 0.7,
      impact: suggestion.impact || 'medium'
    }));
    
    const metrics = calculateMetrics(request.code);
    
    return {
      issues,
      suggestions,
      metrics,
      processingTime: Date.now() - startTime,
      modelUsed: 'gemini-pro'
    };
    
  } catch (error) {
    console.error('AI analysis failed:', error);
    
    // Fallback to basic analysis
    const metrics = calculateMetrics(request.code);
    return {
      issues: [{
        id: 'fallback-1',
        type: 'code-smell',
        severity: 'info',
        message: 'AI analysis temporarily unavailable - showing basic metrics only',
        location: { startLine: 1, startColumn: 1, endLine: 1, endColumn: 1 }
      }],
      suggestions: [],
      metrics,
      processingTime: Date.now() - startTime,
      modelUsed: 'fallback-analyzer'
    };
  }
}