import { initAnswersApi, MongoWrapper } from './src/backend';
import config from './config';
import * as express from 'express';

const app = express();

// Just a simple example of mongodb wrapper - you can change it
const dbWrapper = new MongoWrapper({ ...config.mongo, ecryptKey: config.ecryptKey });

// init Answers API
initAnswersApi(app, dbWrapper, config);

// add your own rest api

app.listen(config.apiPort, () => console.log(`App started, port: ${config.apiPort}`));
