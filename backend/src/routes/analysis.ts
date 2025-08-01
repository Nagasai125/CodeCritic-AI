import { FastifyInstance } from 'fastify';
import { CodeAnalysisRequest, CodeAnalysisResponse } from '../../../shared/types.js';
import { analyzeCode } from '../services/analyzer.js';

export async function codeAnalysisRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: CodeAnalysisRequest }>('/analyze', async (request, reply) => {
    try {
      const { code, language, filename, modelProvider, analysisType } = request.body;
      
      if (!code || !language) {
        return reply.status(400).send({ error: 'Code and language are required' });
      }

      const result = await analyzeCode({
        code,
        language,
        filename,
        modelProvider: modelProvider || 'openai',
        analysisType: analysisType || ['syntax', 'best-practices']
      });

      return result;
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Analysis failed' });
    }
  });
}