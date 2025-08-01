'use client';

import { CodeAnalysisResponse, CodeIssue, RefactorSuggestion } from '../types/types';
import { AlertTriangle, Info, CheckCircle, Lightbulb } from 'lucide-react';

interface AnalysisPanelProps {
  analysis: CodeAnalysisResponse | null;
}

export function AnalysisPanel({ analysis }: AnalysisPanelProps) {
  if (!analysis) {
    return (
      <div className="bg-white rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
        <p className="text-gray-500">Run analysis to see results here</p>
      </div>
    );
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
      default: return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
        <div className="text-sm text-gray-500 mb-4">
          Processed in {analysis.processingTime}ms using {analysis.modelUsed}
        </div>
      </div>

      {/* Code Metrics */}
      <div>
        <h3 className="font-semibold mb-3">Code Metrics</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>Lines of Code: {analysis.metrics.linesOfCode}</div>
          <div>Complexity: {analysis.metrics.cyclomaticComplexity}</div>
          <div>Maintainability: {analysis.metrics.maintainabilityIndex}/100</div>
          <div>Technical Debt: {analysis.metrics.technicalDebt}h</div>
        </div>
      </div>

      {/* Issues */}
      <div>
        <h3 className="font-semibold mb-3">Issues ({analysis.issues.length})</h3>
        <div className="space-y-3">
          {analysis.issues.map((issue: CodeIssue) => (
            <div key={issue.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
              {getSeverityIcon(issue.severity)}
              <div className="flex-1">
                <div className="font-medium">{issue.message}</div>
                <div className="text-sm text-gray-600">
                  Line {issue.location.startLine}:{issue.location.startColumn}
                </div>
                {issue.suggestedFix && (
                  <div className="text-sm text-blue-600 mt-1">{issue.suggestedFix}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <h3 className="font-semibold mb-3">Refactor Suggestions ({analysis.suggestions.length})</h3>
        <div className="space-y-3">
          {analysis.suggestions.map((suggestion: RefactorSuggestion) => (
            <div key={suggestion.id} className="flex gap-3 p-3 bg-blue-50 rounded-lg">
              <Lightbulb className="w-4 h-4 text-blue-500 mt-1" />
              <div className="flex-1">
                <div className="font-medium">{suggestion.title}</div>
                <div className="text-sm text-gray-600 mb-2">{suggestion.description}</div>
                <div className="text-xs text-gray-500">
                  Confidence: {Math.round(suggestion.confidence * 100)}% | 
                  Impact: {suggestion.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}