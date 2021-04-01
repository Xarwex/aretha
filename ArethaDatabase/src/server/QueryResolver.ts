import DB from './db'

export const queryResolver = {
    get: {
        action: {
            invoke: async (args, context) => {
                let actions: JSON = await DB.Actions.query(args.name, args.timestamp)
                return actions
            }
        }
    }
}

/* Usage:
    const result = await miniql(query, queryResolver, { verbose: true }); */