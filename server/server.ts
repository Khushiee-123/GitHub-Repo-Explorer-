import app from './src/app';
import { config } from './src/config/index';
import { shutdownCaches } from './src/services/githubService';

const server = app.listen(config.PORT, () => {
  console.log(`🚀 GitLens Explorer API server running on port ${config.PORT}`);
  console.log(`   Environment: ${config.NODE_ENV}`);
  console.log(`   CORS origin: ${config.ALLOWED_ORIGIN}`);
  console.log(`   GitHub token: ${config.GITHUB_TOKEN ? 'configured' : 'not set (rate limits will be lower)'}`);
  console.log(`   Cache TTL: ${config.CACHE_TTL_SECONDS}s`);
});

// Graceful shutdown
function gracefulShutdown(signal: string): void {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  shutdownCaches();
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('Forced shutdown after timeout.');
    process.exit(1);
  }, 10_000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default server;
