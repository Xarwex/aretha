import * as express from 'express';
import { port } from './server'
import * as fetch from 'node-fetch'
import { arethaRegistryURL, name, emoPath } from './../../config/index'
import * as fs from 'fs'

const router = express.Router();
let emotionsSession: Emotions = {
    totalTime: 0,
    angry: 0,
    disgust: 0,
    fear: 0,
    happy: 0,
    neutral: 0,
    sad: 0,
    surprise: 0
}

let emotionsTotal: Emotions

try {
    let rawdata = fs.readFileSync(emoPath)
    emotionsTotal = JSON.parse(rawdata.toString()) as Emotions
} catch {
    emotionsTotal = {
        totalTime: 0,
        angry: 0,
        disgust: 0,
        fear: 0,
        happy: 0,
        neutral: 0,
        sad: 0,
        surprise: 0
    }
}

router.get('/isAlive', async (req, res) => {
    res.sendStatus(200)
})

router.put('/signal', async (req, res) => {
    try {
        await fetch(arethaRegistryURL + "/alive?name=" + name + "&url=" + encodeURIComponent("http://localhost:" + port), {
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
        let response = await fetch(arethaRegistryURL + '/apps', {})
        let responseJson = await response.json()
        res.json(responseJson)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

router.put('/emotions', async (req, res) => {
    let emoJson = JSON.parse(req.query.json.toString())
    addEmotion(emotionsSession, emoJson)
    addEmotion(emotionsTotal, emoJson)
    fs.writeFile(emoPath, JSON.stringify(emotionsTotal), e => { if (e) console.error(e) })
    res.sendStatus(200)
})

router.get('/emotions/sesion', async (req, res) => {
    res.
})

function addEmotion(emotions: Emotions, emoJson: JSON) {
    let interval: number = emoJson["interval"] / 1000
    let totalTime = emotions.totalTime // In seconds
    let newTotalTime = totalTime + interval
    let emoSum = 0
    Object.keys(emoJson).forEach(key => { if (key != "interval") emoSum += emoJson[key] })
    if (emoSum > 15) {
        Object.keys(emotions).forEach(key => {
            if (key != "totalTime") {
                emotions[key] = (emotions[key] * totalTime + emoJson[key] * interval / emoSum) / (newTotalTime)
            }
        })
        emotions.totalTime = newTotalTime
    }
    console.log(emotions)
}

interface Emotions {
    totalTime: number
    angry: number
    disgust: number
    fear: number
    happy: number
    neutral: number
    sad: number
    surprise: number
}

export default router;