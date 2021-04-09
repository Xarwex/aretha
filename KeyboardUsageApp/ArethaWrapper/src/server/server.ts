import * as express from 'express';
import apiRouter from './routes';
import * as fetch from 'node-fetch'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const app = express();

app.use(express.static('public'));
app.use(apiRouter);

const server = app.listen(process.env.PORT || 0, () => console.log(`Server listening on port: ${server.address().port}`));
export const port = server.address().port
