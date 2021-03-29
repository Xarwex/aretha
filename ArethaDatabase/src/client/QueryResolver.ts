export const queryResolver = {
    get: {
        action: {
            invoke: async (args, context) => {
                const timestamp = args.actionTimestamp != undefined ? args.actionTimestamp.toString() : '0'
                const name = args.actionName != undefined ?  args.actionName : ''
                const apiQuery = '/api/actions/' + timestamp + '/' + name
                const result = await fetch(apiQuery)
                const resJson = await result.json()
                return resJson
            }
        }
    }
}

/* Usage: 
    const result = await miniql(query, queryResolver, { verbose: true }); */