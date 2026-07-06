import { Server as HttpServer } from 'node:http';

import { Server } from 'socket.io';

import { corsOptions } from '../config/cors';

export function configureSocketServer(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: corsOptions,
  });

  io.on('connection', (socket) => {
    socket.emit('connected', {
      socketId: socket.id,
      timestamp: new Date().toISOString(),
    });
  });

  return io;
}

