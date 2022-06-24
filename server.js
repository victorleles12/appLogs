const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./swagger.json')
const cors = require('cors')
require('dotenv').config()

const {selectBD, insertBd, deleteBdData, deleteProjectData, selectProject} = require('./src/model/bd.js')

function server(){

    const app = express()

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

    app.use(cors())
    
    app.use(express.json())

    let port = process.env.PORT;

    if (port == null || port == "") {
        port = 8000;
    }
    
    app.post('/insertLog', async (req, res) =>{

        try{
            let result = await insertBd(req.body)
        
            res.send({code: 200, message: 'ok'})

        }catch(err){

            res.send(err)
        }

    })
    
    app.post('/instantLog', (req, res) =>{
        console.log(req.body);
        res.send({code: 200, message: 'ok'})
    })
    
    app.get('/getlogs', async (req, res) =>{
        try{
            let result = await selectBD()
        
            res.send({code: 200, message: result})

        }catch(err){

            res.send(err)

        }
    })

        
    app.get('/getproject/:project', async (req, res) =>{
        try{
            let result = await selectProject(req.params.project)
        
            res.send({code: 200, message: result})

        }catch(err){

            res.send(err)

        }
    })
    

    app.delete('/deletelogs', async (req, res) =>{
        try{
            let result = await deleteBdData()
            
            res.send({code: 200, message: result})
        }catch(err){

            res.send(err)

        }
    })
    
    app.delete('/deleteProject', async (req, res) =>{
        try{
            let result = await deleteProjectData(req.body)
            
            res.send({code: 200, message: result})
            
        }catch(err){

            res.send(err)
        }
    })
    
    app.listen(port, ()=>{
        console.log('server rodando na porta ' +  port)
    })
}

module.exports = server
