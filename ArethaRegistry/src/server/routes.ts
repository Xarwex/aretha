import * as express from 'express';
import * as fetch from 'node-fetch'
import { port } from './server'

const router = express.Router();
let appMap: Map<string, number> = new Map()

router.put('/alive/:appname/:port', async (req, res) => {
    try {
        let name: string = req.params.appname
        let port: number = Number(req.params.port)
        appMap.set(name, port)
        console.log("Map entry: " + name + " " + port)
        console.log(appMap.size)
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
    appMap.set("app1", 3003)
    appMap.set("app2", 3002)
    res.sendStatus(200)
})

router.get('/port', async (req, res) => {
    res.json(port)
})

async function removeDeadApps() {
    let inactiveList: Array<string> = new Array()
    for (let [key, value] of appMap) {
        await fetch('http://localhost:' + value + '/isAlive')
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