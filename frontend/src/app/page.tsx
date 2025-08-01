'use client';

import { useState } from 'react';
import { CodeEditor } from '../components/CodeEditor';
import { AnalysisPanel } from '../components/AnalysisPanel';
import { CodeAnalysisRequest, CodeAnalysisResponse } from '../types/types';

export default function Home() {
  const [code, setCode] = useState('// Enter your code here\nconst example = "hello world";');
  const [language, setLanguage] = useState('typescript');
  // Only using Gemini now
  const [analysis, setAnalysis] = useState<CodeAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeCode = async () => {
    setLoading(true);
    try {
      const request: CodeAnalysisRequest = {
        code,
        language,
        modelProvider: 'gemini',
        analysisType: ['syntax', 'best-practices', 'security', 'performance']
      };

      const response = await fetch('http://localhost:8080/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      });

      const result = await response.json();
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center">AI Code Reviewer</h1>
        <p className="text-center text-gray-600 mt-2">
          Analyze and improve your code with AI assistance
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <div className="space-y-4">
          <div className="flex gap-4 items-center flex-wrap">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
            <div className="px-3 py-2 border rounded-md bg-gray-100 text-gray-700">
              Google Gemini Pro
            </div>
            <button
              onClick={analyzeCode}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Analyze Code'}
            </button>
          </div>
          <CodeEditor
            value={code}
            onChange={setCode}
            language={language}
          />
        </div>

        <AnalysisPanel analysis={analysis} />
      </div>
    </div>
  );
}