const configConnection = require('./bdConnect.js')

async function creteDb(){

    const client = configConnection()

    try{
        await client.connect()

        const Query = {
            text: `ALTER TABLE logsis
            ALTER COLUMN descricao TYPE VARCHAR(8000);`
        }
        
        await client.query(Query);
    
        console.log('banco criado com sucesso')

    }catch(err){

        console.log(err)

        throw err
    }
}

creteDb()

module.exports = creteDb

