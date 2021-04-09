import * as fetch from 'node-fetch'

export const queryResolver = {
    get: {
        keylog: {
            invoke: async (args, context) => {
                let response = await fetch("https://localhost:5001/keylog")
                let responseJson = await response.json()
                return responseJson
            }
        }
    }
}

/*
Query for all keylogs:
{
    "get": {
        "keylog":
        {

        }
    }
}
*/