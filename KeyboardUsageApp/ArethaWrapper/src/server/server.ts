import * as express from 'express';
import apiRouter from './routes';
import * as fetch from 'node-fetch'

const app = express();

app.use(express.static('public'));
app.use(apiRouter);

const server = app.listen(process.env.PORT || 0, () => console.log(`Server listening on port: ${server.address().port}`));
export const port = server.address().port

/*
fetch('http://localhost:' + port + '/signal', {
    method: 'PUT'
})
    .then(response => console.log(response.status))
    .catch(e => console.error(e))
*/
/*
xinput_get_all_devices_id((devices_id_list: number[])=> {
    var listener = new xinput_listener(devices_id_list, (xinput_events_list: xinput_events_list)=> {
        console.log('events!', xinput_events_list);
    }, 0); // <- 0 is set, live mode is active!
});
//*/

