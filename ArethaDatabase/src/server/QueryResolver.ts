import DB from './db'
import * as json5 from 'json5'

export const queryResolver = {
    get: {
        action: {
            invoke: async (args, context) => {
                /*
                const timestamp = args.actionTimestamp != undefined ? args.actionTimestamp.toString() : '0'
                const name = args.actionName != undefined ?  args.actionName : ''
                const apiQuery = '/api/actions/' + timestamp + '/' + name
                console.log(apiQuery)
                const result = await fetch(apiQuery)
                const resJson = await result.json()
                return resJson
                */
                //console.log(req.params.name + " " + req.params.timestamp)
                let actions: JSON = await DB.Actions.query(args.name, args.timestamp)
                console.log("db res:\n", actions)
                let actionstr = await JSON.stringify(actions)
                console.log("stringres: \n", actionstr)
                return actions       
            }
        }
    }
}

/* Usage: 
    const result = await miniql(query, queryResolver, { verbose: true }); */