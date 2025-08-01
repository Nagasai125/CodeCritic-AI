import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { config } from 'dotenv';
import { codeAnalysisRoutes } from './routes/analysis.js';

config();

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: ['http://localhost:3000'],
});

await fastify.register(multipart);
await fastify.register(codeAnalysisRoutes, { prefix: '/api' });

fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

const start = async () => {
  try {
    await fastify.listen({ port: 8080 });
    console.log('🚀 Server running on http://localhost:8080');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();