import * as express from 'express';
import * as fetch from 'node-fetch'
import { port } from './server'

const router = express.Router();
let appMap: Map<string, URL> = new Map()

router.put('/alive', async (req, res) => {
    try {
        let name: string = String(req.query.name)
        let url: URL = new URL(String(req.query.url))
        console.log(name)
        appMap.set(name, url)
        console.log("Map entry: " + name + " " + url)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.get('/apps', async (req, res) => {
    try {
        await removeDeadApps()
        let jsonObject = {}
        appMap.forEach((value, key) => {
            jsonObject[key] = value
        })
        res.json(jsonObject)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

// To check if everything works - remove later
router.get('/init', async (req, res) => {
    let url1 = new URL("http://localhost:3003")
    let url2 = new URL("http://localhost:3002")
    appMap.set("app1", url1)
    appMap.set("app2", url2)
    res.sendStatus(200)
})

router.get('/port', async (req, res) => {
    res.json(port)
})

async function removeDeadApps() {
    let inactiveList: Array<string> = new Array()
    for (let [key, value] of appMap) {
        await fetch(value + 'isAlive')
            .then(response => {
                if (response.status != 200)
                    inactiveList.push(key)
            })
            .catch(e => {
                inactiveList.push(key)
                console.error(e)
            })
    }
    inactiveList.forEach(name => appMap.delete(name))
}


export default router;