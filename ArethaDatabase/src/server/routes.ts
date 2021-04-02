import * as express from 'express'
import DB from './db'
import { queryResolver } from './QueryResolver'
import { miniql } from 'miniql'
import * as fetch from 'node-fetch'
import { port } from './server'
import arethaRegistryURL from './../../config/index'

const router = express.Router()

router.get('/api/actions/:timestamp?/:name?', async (req, res) => {
    try {
        let actions = await DB.Actions.query(req.params.name, req.params.timestamp)
        console.log(actions)
        res.json(actions)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.get('/miniql/:query', async (req, res) => {
    try {
        let queryText: string = req.params.query
        let query = JSON.parse(queryText);
        const context = {}
        let result = await miniql(query, queryResolver, { verbose: false });
        console.log(result)
        res.json(result)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

router.get('/isAlive', async (req, res) => {
    res.sendStatus(200)
})

router.put('/signal', async (req, res) => {
    try {
        let signal = await fetch(arethaRegistryURL + "/alive?name=arethaDB&url=" + encodeURIComponent("http://localhost:" + port), {
            method: 'PUT',
        })
        res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

export default router;