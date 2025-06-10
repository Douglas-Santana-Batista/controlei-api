import express from 'express'
import 'dotenv/config'
import { router } from './routes/router';
import { errorHandler } from './middlewares/errorHandler';

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log("server running")
})