import * as express from 'express';
import { port } from './server'
import * as fetch from 'node-fetch'
import arethaRegistryURL from './../../config/index'
import { queryResolver } from './QueryResolver'
import { miniql } from 'miniql'

const router = express.Router();

router.get('/isAlive', async (req, res) => {
    console.log("I live")
    res.sendStatus(200)
})

router.put('/signal', async (req, res) => {
    try {
        await fetch(arethaRegistryURL + "/alive?name=arethaWrapper&url=" + encodeURIComponent("http://localhost:" + port), {
            method: 'PUT',
        })
        res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

router.get('/miniql/:query', async (req, res) => {
    try {
        let queryText: string = req.params.query
        let query = JSON.parse(queryText)
        const context = {}
        let result = await miniql(query, queryResolver, { verbose: false });
        console.log(result)
        res.json(result)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

export default router;