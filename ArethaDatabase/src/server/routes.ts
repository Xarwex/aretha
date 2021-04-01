import * as express from 'express'
import DB from './db'
import { queryResolver } from './QueryResolver'
import { miniql } from 'miniql'
import * as fetch from 'node-fetch'

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
        let signal = await fetch("http://localhost:3000/alive/arethadb/3001", {
            method: 'PUT'
        })
        res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

export default router;