import http from 'node:http';

import { app } from './app';
import { env } from './config/env';
import { configureSocketServer } from './sockets';

const server = http.createServer(app);

configureSocketServer(server);

server.listen(env.PORT, () => {
  console.log(`API server listening on port ${env.PORT}`);
});

const shutdown = (signal: NodeJS.Signals) => {
  console.log(`${signal} received. Closing HTTP server.`);
  server.close(() => {
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

