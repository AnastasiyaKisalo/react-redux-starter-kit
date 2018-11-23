#!/usr/bin/env node

import * as express from 'express';
import clientConfig from '../webpack/isomorphic/client.config';
import serverConfig from '../webpack/isomorphic/server.config';
import { startDevelopmentMode, startProductionMode } from './starters';
import middleware from './middleware';

const { NODE_ENV, PORT } = process.env;

const app = middleware(express());

const starters = {
  development: startDevelopmentMode,
  production: startProductionMode,
};
const starter = NODE_ENV && (starters as any)[NODE_ENV] || startDevelopmentMode;

starter(app, clientConfig, serverConfig);

PORT && app.listen(+PORT, '0.0.0.0', (err: any) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Listening at http://localhost:${PORT}`.bold);
  }
});