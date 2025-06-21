import express from 'express'
import { router } from './routes/router';
import { errorHandler } from './middlewares/errorHandler';
import dotenv from 'dotenv';

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

dotenv.config()

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log("server running")
})