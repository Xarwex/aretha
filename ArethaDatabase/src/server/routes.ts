import * as express from 'express'
import DB from './db'
import { queryResolver } from './QueryResolver'
import { miniql } from 'miniql'
import * as json5 from 'json5'

const router = express.Router()

router.get('/api/actions/:timestamp?/:name?', async (req, res) => {
    try {
        //console.log(req.params.name + " " + req.params.timestamp)
        let actions = await DB.Actions.query(req.params.name, req.params.timestamp)
        console.log(actions)
        res.json(actions)
    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.get('/miniql/:query', async (req, res) => {
    try {
        let queryText: string= req.params.query 
        let query = JSON.parse(queryText);
        let result = await miniql(query, queryResolver, { verbose: false });
        console.log(result)
        res.json(result)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

export default router;