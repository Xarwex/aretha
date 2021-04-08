import * as express from 'express';
import { port } from './server'
import * as fetch from 'node-fetch'
import arethaRegistryURL from './../../config/index'

const router = express.Router();

router.get('/isAlive', async (req, res) => {
    res.sendStatus(200)
})

router.put('/signal', async (req, res) => {
    try {
        await fetch(arethaRegistryURL + "/alive?name=demoApp&url=" + encodeURIComponent("http://localhost:" + port), {
            method: 'PUT',
        })
        res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

router.get('/appNames', async (req, res) => {
    try {
        let response = await fetch(arethaRegistryURL + '/apps')
        let responseJson = await response.json()
        res.json(responseJson)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

export default router;