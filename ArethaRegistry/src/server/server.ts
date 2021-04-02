import * as express from 'express';
import apiRouter from './routes';

const app = express();

app.use(express.static('public'));
app.use(apiRouter);

const server = app.listen(process.env.PORT || 3000, () => console.log(`Server listening on port: ${server.address().port}`));
export const port = server.address().port