import * as express from 'express'
import DB from './db'

const router = express.Router()

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.get('/api/actions/:timestamp?/:name?', async (req, res) => {
    try {
        //console.log(req.params.name + " " + req.params.timestamp)
        let blogs = await DB.Actions.query(req.params.name, req.params.timestamp)
        res.json(blogs)
    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
})

export default router;