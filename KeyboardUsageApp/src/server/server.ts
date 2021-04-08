import * as express from 'express';
import apiRouter from './routes';
import * as fetch from 'node-fetch'

const app = express();

app.use(express.static('public'));
app.use(apiRouter);

const server = app.listen(process.env.PORT || 0, () => console.log(`Server listening on port: ${server.address().port}`));
export const port = server.address().port

fetch('http://localhost:' + port + '/signal', {
    method: 'PUT'
})
    .then(response => console.log(response.status))
    .catch(e => console.error(e))