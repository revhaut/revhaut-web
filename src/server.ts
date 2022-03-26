import dotenv from 'dotenv';
import http from 'http';
// eslint-disable-next-line import/order
import app from '../src/app';

dotenv.config();
// eslint-disable-next-line import/first
import { PORT } from '../src/configs/appConfig';

const server: http.Server = http.createServer(app);

server.listen(PORT);

server.on('error', (e: Error) => {
  console.log(`Error starting server${e}`);
});

server.on('listening', () => {
  console.log(`Server started http://localhost:${PORT} on env ${process.env.NODE_ENV || 'dev'}`);
});
