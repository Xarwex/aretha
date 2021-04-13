import * as express from 'express';
import { port } from './server'
import * as fetch from 'node-fetch'
import { Mutex, Semaphore } from 'async-mutex'
import arethaRegistryURL from './../../config/index'

const router = express.Router();

router.get('/isAlive', async (req, res) => {
    res.sendStatus(200)
})

router.put('/signal', async (req, res) => {
    try {
        await fetch(arethaRegistryURL + "/alive?name=RomeoAndJuliet&url=" + encodeURIComponent("http://localhost:" + port), {
            method: 'PUT',
        })
        res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

router.get('/keylog', async (req, res) => {
    try {
        const query = '{ "get": { "keylog": { } } }'
        let apps = await fetch(arethaRegistryURL + '/apps')
        let appsJson: JSON = await apps.json()
        let responseArray: JSON[] = new Array<JSON>()
        let resMutex = new Mutex()
        let completed = 0
        let total = Object.keys(appsJson).length
        for (const element in appsJson) {
            fetch(appsJson[element] + 'miniql/' + query)
                .then(response => response.json())
                .then((data: JSON) => {
                    resMutex.acquire().then(release => {
                        responseArray.push(data)
                        console.log(responseArray)
                        completed++
                        release()
                    })
                }).catch(e => {
                    completed++
                    console.error(e)
                })
        }

        waitFor(_ => completed == total)
            .then(_ => res.json(responseArray))
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

function waitFor(conditionFunction) {

    const poll = resolve => {
        if (conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 400);
    }

    return new Promise(poll);
}

export default router;
