const express =require("express");
const sql_client = require('mysql')
require("dotenv").config();
const axios = require('axios')
var bodyParser = require('body-parser');
const jwt=require("jsonwebtoken")
const app=express()
//const actions=require('./controllers/userController')

app.use(bodyParser.json());
const client = sql_client.createConnection({
    database: 'imagenes',
    host: "35.223.76.112",
    port: 3306,
    user: "ricardo",
    password: "ricricric" //abcd1234
})
client.connect(err => console.log(err || `> Connection stablished`))
const api=process.env.CLOUD_FUNCTION



app.post('/signup', ({ body }, res) => signup(body, res))
app.post('/signin', ({ body }, res) => signin(body, res))
app.post('/insert', ({ body}, res) => insert(body, res))
app.post('/insert', ({ body}, res) => insert(body, res))

//Registrarse
const signup = ({ table, names, values }, res) => {
    try {
        const n = names.join(', ')
        const v = values.map(v => `'${v}'`).join(', ')
        const sql = `INSERT INTO ${table} (${n}) VALUES (${v})`
        console.log(`> Executing ${sql}`)
        client.query(sql, values, (err, r) => {
            if (err){
                console.log(`! Error inserting to table ${table}`)
                console.log(err)
                return {status:false}
            }
           jwt.sign({id:r.insertId}, "secretKey",{expiresIn:"12d"}, (err, token)=>{
                res.json({
                    token:  token,
                    id:r.insertId,
                    status:1
                })
                console.log(token,r.insertId)
            })
        })
    } catch (error) {
        console.log(error)
        res.json({status:3})
    }  
}
//login
const signin = ({ username, pass }, res) => {
    try {
        console.log(username)
        axios
        .post(api+'/getData', {
            table:"user",
            id:username,
            tableid:"username"
            })
        .then(result => {
            console.log(result.data)
            if (String(result.data[0].password)===String(pass)) {
                jwt.sign({result:result.data}, "secretKey",{expiresIn:"12d"},(err, token)=>{
                    res.json({
                        token,
                        info:result.data,
                        status:1
                    })
                })
            } else {
                res.status(400).json({message:"don't match info", status:2})    
            } 
        })
        .catch((error)=>{res.status(400).json({message:error}); console.log(error)})   
    } catch (error) {
        res.status(400).json({Error:error, status:3})
        console.log(error)
    }    
};
//insert data ya sea album, img, union
app.post("/insertData", (req,res)=>{ 
    jwt.verify(req.token, 'secretKey',(error, authData)=>{
        if (error) {
            res.sendStatus(403);
            console.log(error)
        } else {
            try {
                const n = names.join(', ')
                const v = values.map(v => `'${v}'`).join(', ')
                const sql = `INSERT INTO ${table} (${n}) VALUES (${v})`
                console.log(`> Executing ${sql}`)
                client.query(sql, values, (err, r) => {
                    if (err){
                        console.log(`! Error inserting to table ${table}`)
                        console.log(err)
                        return res.json(err).status(500)
                    }
            
                    console.log(`> Success inserting to table ${table}`)
                    console.log(r)
                    res.json(r)
                })
            } catch (error) {
                res.json({message:error})
            }           
        }
    })
});
//updateData
app.put("/update", verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretKey',(error, authData)=>{
        if (error) {
            res.sendStatus(403);
            console.log(error)
        } else {
            try {
                axios
                .post(api+'/updateData', req.body)
                .then(data => {
                    res.json(data)
                })
                .catch((error)=>res.json({message:error}))   
            } catch (error) {
                res.json({message:error})
            }           
        }
    })
});

//deleteAlbum
app.delete("/dataAlbum", verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretKey',(error, authData)=>{
        if (error) {
            res.sendStatus(403);
            console.log(error)
        } else {            
            try {
                axios
                .post(api+'/deleteAlbum', req.body)
                .then(data => {
                    res.json(data)
                })
                .catch((error)=>res.json({message:error}))   
            } catch (error) {
                res.json({message:error})
            }            
        }
    })
});
//obtener uno por alguna columna
app.get("/allData", verifyToken, async (req,res)=>{
    jwt.verify(req.token, 'secretKey',(error, authData)=>{
        if (error) {
            res.sendStatus(403);
            console.log(error)
        } else {   
            try {
                axios
                .post(api+'/getData', req.body)
                .then(data => {
                    res.json(data)
                })
                .catch((error)=>res.json({message:error}))   
            } catch (error) {
                res.json({message:error})
            }                                            
        }
    })
});
//obtenerTodos ya sea img o album, user
app.get("/allData", verifyToken, async (req,res)=>{
    jwt.verify(req.token, 'secretKey',(error, authData)=>{
        if (error) {
            res.sendStatus(403);
            console.log(error)
        } else {   
            try {
                axios
                .post(api+'/getData', req.body)
                .then(data => {
                    res.json(data)
                })
                .catch((error)=>res.json({message:error}))   
            } catch (error) {
                res.json({message:error})
            }                                            
        }
    })
});
function verifyToken(req, res, next){
    console.log(req.headers)
const bearerHeader=req.headers['authorization'];
console.log(bearerHeader+'---------')
    if (typeof bearerHeader!=='undefined') {
        const bearerToken=bearerHeader.split(" ")[1];
        req.token=bearerToken;
        next();
    } else {
        console.log("err1")
        res.sendStatus(403);
    }
    next()
}
app.listen(3000, function(){
    console.log("nodejs running on 3000")
})



/*
crear album *
agregar imagen *
anadir imagen a album *

favoritos imagen *

obtener imagenes de un album*
obtener perfil *

eliminar album *


cambiar password
modificar sus datos
editar nombre album
eliminar cuenta
quitar imagen de album
*/