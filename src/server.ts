import express from 'express'
import { router } from './router';
import { errorHandler } from './middlewares/errorHandler';


const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log("servidor funcionando")
})