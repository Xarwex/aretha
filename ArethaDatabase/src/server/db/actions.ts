import { Connection } from './index'

export async function query(actionName, actionTimestamp): Promise<JSON>{ 
    
    let query = 'SELECT * FROM actions WHERE actionTimestamp >= '
     + (actionTimestamp != undefined ? actionTimestamp.toString() : '0')
     + (actionName != undefined ? ' AND actionName = "' + actionName.toString() + '"' : "")

    return new Promise((resolve, reject) => {
        Connection.query(query, (err, results) => {
            if(err) return reject(err)
            resolve(results)
        })
    })
}

export default{
    query
}