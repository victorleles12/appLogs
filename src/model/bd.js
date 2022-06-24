const configConnection = require('../utils/bdConnect.js')


async function selectBD(){

    const client = configConnection()
    
    await client.connect()

    try{
        
        const res = await client.query('SELECT * FROM public.logsis')
    
        await client.end();
    
        return res.rows

    }catch(err){

        throw err
    }

}

async function selectProject(projeto){

    const client = configConnection()
    
    await client.connect()

    try{
        
        const res = await client.query(`SELECT * FROM public.logsis where projeto = '${projeto}'`)
    
        await client.end();
    
        return res.rows

    }catch(err){

        throw err
    }

}

async function insertBd(body){
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    if (dia < 10) dia = "0" + dia;
    let mes = (dataAtual.getMonth() + 1);
    if (mes < 10) mes = "0" + mes;
    let ano = dataAtual.getFullYear();
    let horas = dataAtual.getHours() -3;
    if (horas < 10) horas = "0" + horas;
    let minutos = dataAtual.getMinutes();
    if (minutos < 10) minutos = "0" + minutos;
    let timeInMs = `${dia}/${mes}/${ano} - ${horas}:${minutos}`

    try{

        const client = configConnection()
    
        await client.connect()
        
        const Query = {
            text: 'INSERT INTO ' + 'public.logsis' + ' ('
                + 'flag,' 
                + 'cliente,'
                + 'descricao,' 
                + 'erro,' 
                + 'projeto,'
                + 'date'
                + ')values('
                + '$1,$2,$3,$4,$5,$6)',
        values: [
                body.flag,
                body.cliente, 
                body.descricao, 
                body.erro,
                body.projeto,
                timeInMs
            ] 
        };

        await client.query(Query)
 
        await client.end();

        return 'dados inseridos com sucesso'

    }catch(err){

        throw err
    }

}

async function deleteBdData(body){

    try{

        const client = configConnection()
        
        await client.connect()
        
        await client.query(`DELETE FROM public.logsis`)
    
        client.end()

        return 'dados apagados com sucesso'

    }catch(err){

        throw err
    }

}

async function deleteProjectData(body){

    try{

        const client = configConnection()

        await client.connect()

        console.log(body.project)
        
        await client.query(`DELETE FROM public.logsis where projeto = '${body.project}'`)
    
        client.end()

        return 'projeto apagado com sucesso'
        
    }catch(err){

        throw err
    }

}

module.exports = {selectBD, insertBd, deleteBdData, deleteProjectData, selectProject}