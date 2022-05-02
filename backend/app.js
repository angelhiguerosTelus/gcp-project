const express =require("express");
const sql_client = require('mysql')
require("dotenv").config();
const axios = require('axios')
var bodyParser = require('body-parser');
const jwt=require("jsonwebtoken")
const cors=require("cors")
const app=express()
const path = require('path');
const Multer = require('multer');
const {format} = require('util');
const {Storage}=require('@google-cloud/storage')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost')
    next()
})
app.use(cors({
    origin: "*",
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204
  }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.set('trust proxy', true)

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
  });

const client = sql_client.createConnection({
    database: 'imagenes',
    host: "35.223.76.112",
    port: 3306,
    user: "ricardo",
    password: "ricricric" //abcd1234
})
client.connect(err => console.log(err || `> Connection stablished`))
const api=process.env.CLOUD_FUNCTION


const names={
    album:['name', 'idUserA'],
    user:["name","username","password","biografia","gravatar"],
    image:['descripcion','favorito','URL','idUserI'],
    union:['idAlbumU','idImgU']
}

const gc=new Storage({
    keyFilename: path.join(__dirname,'./final-348322-13c94f130c78.json'),
    projectId:'final-348322'
});
const bucket= gc.bucket('storage-images');



app.post('/especial', ({ body}, res) => especial(body, res))

app.post('/signup', ({ body }, res) => signup('user',names.user,body.values, res))
app.post('/signin', ({ body }, res) => signin(body, res))
app.post('/insertDataImagen', ({body}, res) => insertData('imagenes',names.image, body.values, res))
app.post('/insertDataAlbum', verifyToken, ({ body}, res) => insertData('album',names.album,body.values, res))
app.post('/insertDataUnion', verifyToken, ({ body}, res) => insertData('albumImg',names.union,body.values, res))
app.post('/oneDataImage', verifyToken, ({ body}, res) => oneData('imagenes','idUserI',body.id, res))
app.post('/userData', verifyToken, ({ body}, res) => oneData('user','idUser',body.id, res))
app.get('/oneDataAlbum', verifyToken, ({ body}, res) => oneData('album','idUserA',body.id, res))
app.get('/oneDataUnion', verifyToken, ({ body}, res) => oneData('albumImg','idAlbumU',body.id, res))
app.put('/newFav', verifyToken, ({ body}, res) => update('imagenes','idImg',body, res))
app.put('/updatePass', verifyToken, ({ body}, res) => update('user','idUser',body, res))
app.delete('/deleteAlbum', verifyToken, ({ body}, res) => deleteAlbum(body, res))
app.delete('/deleteImageFromAlbum', verifyToken, ({ body}, res) => deleteImageFromAlbum(body, res))
app.delete('/deleteImageFromAlbumWithoutId', verifyToken, ({ body}, res) => deleteImageFromAlbumWithoutId(body, res))


app.delete('/closeAccunt', verifyToken, ({ body}, res) => deleteAccount(body, res))
app.post('/getFavoritesImages', verifyToken, ({ body}, res) => oneData2('imagenes',`idUserI = ${body.id} AND favorito = '1'`, res))
app.post('/getAlbums', verifyToken, ({ body}, res) => oneData2('album',`idUserA = '${body.id}'`, res))
app.get('/getAlbums/:id', verifyToken, ({ params }, res) => oneData2('album',`idAlbum = '${params.id}'`, res))
app.get('/getAlbums/:id/photos', verifyToken, ({ params }, res) => getDataAlbumPhotos(params.id, res))
app.put('/userUpdateInfo', verifyToken, ({ body }, res) =>update('user','idUser', body, res))




// Process the file upload and upload to Google Cloud Storage.
app.post('/upload', multer.single('file'), (req, res, next) => {
    if (!req.file) {
      res.status(400).json('No file uploaded.');
      return;
    }
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.on('error', err => {
      next(err);
    });
    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      console.log(publicUrl)
      res.json({link:publicUrl});
    });
    blobStream.end(req.file.buffer);
  });

const signup = (table, names, values, res) => {
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
           jwt.sign({id:r.insertId}, process.env.TOKEN_SECRET,{expiresIn:"12d"}, (err, token)=>{
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
    console.log(username, pass)
    try {
        axios
        .post(api+'/getData', {
            table:"user",
            id:username,
            tableid:"username"
            })
        .then(result => {
            console.log(result.data)
            if ((String(result.data[0]?.password)===String(pass))) {
                jwt.sign({result:result.data[0].idUser}, process.env.TOKEN_SECRET,{expiresIn:"12d"}, (err, token)=>{
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
const insertData = (table, names, values, res) => {
    try {  
        const n = names.join(', ')
        const v = values.map(v => `'${v}'`).join(', ')
        const sql = `INSERT INTO ${table} (${n}) VALUES (${v})`
        console.log(`> Executing ${sql}`)
        client.query(sql, values, (err, r) => {
            if (err){
                console.log(`! Error inserting to table ${table}`)
                console.log(err)
                return res.json({status:2}).status(500)
            }
    
            console.log(`> Success inserting to table ${table}`+{status:1, id:r.insertId})
            res.json({status:1, id:r.insertId})
        })
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }             
};

const oneData2 = (table, filter, res) => {
    try {
        axios
        .post(api+'/getData2', {
            table, 
            filter
            })
        .then(result => {
            console.log(result.data)
        res.json({status:1, info:result.data})
        })
        .catch((error)=>{res.status(400).json({status:2,message:error}); console.log(error)})   
    } catch (error) {
        res.status(400).json({Error:error, status:3})
        console.log(error)
    }   
}
const getDataAlbumPhotos = (idAlbum, res) => {
    try {
        axios
        .post(api+'/getAlbumPhotos', {
            idAlbum
            })
        .then(result => {
        console.log(result.data)
        res.json({status:1, info:result.data})
        })
        .catch((error)=>{res.status(400).json({status:2,message:error}); console.log(error)})   
    } catch (error) {
        res.status(400).json({Error:error, status:3})
        console.log(error)
    }   
}
//--------------------------------------------este toca
// Obetener las imagenes que guarden  como favoritos
const getFavoritesImages = (table, filter, res) => {
    
    try {  
        const sql = `SELECT * FROM ${table} WHERE ${filter}`
        console.log(`> Executing ${sql}`)
        client.query(sql, (err, r) => {
            if (err){
                console.log(`! Error select from table ${table}`)
                console.log(err)
                return res.json({status:2}).status(500)
            }
    
            console.log(`> Success select from table ${table}`)
            console.log({status:1, info: r})
            res.json({status:1, info:r})
        })
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }             
};
//--------------------------------------------este toca
// Obetener  los albums del usuario
const getAlbums = (table, filter, res) => {
    try {  
        const sql = `SELECT * FROM ${table} WHERE ${filter}`
        console.log(`> Executing ${sql}`)
        client.query(sql, (err, r) => {
            if (err){
                console.log(`! Error select from table ${table}`)
                console.log(err)
                return res.json({status:2}).status(500)
            }
            console.log(`> Success select from table ${table}`)
            console.log(r)
            res.json({status:1, info:r})
        })
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }             
};


//--------------------------------------------este toca

// Obetener la informacion de un album
const getAlbumInfo = (table, filter, res) => {
    try {  
        const sql = `SELECT * FROM ${table} WHERE ${filter}`
        console.log(`> Executing ${sql}`)
        client.query(sql, (err, r) => {
            if (err){
                console.log(`! Error select from table ${table}`)
                console.log(err)
                return res.json({status:2}).status(500)
            }
    
            console.log(`> Success select from table ${table}`)
            console.log({status:1, info: r})
            res.json({status:1, info:r})
        })
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }             
};

//--------------------------------------------este toca
// Obetener las imagenes de un album
const getAlbumPhotos = (idAlbum, res) => {
    try {  
        const sql = `SELECT imagenes.idImg, imagenes.descripcion, imagenes.favorito, imagenes.URL
                     FROM albumImg
                     JOIN imagenes ON imagenes.idImg = albumImg.idImgU
                     WHERE idAlbumU = '${idAlbum}'`
        console.log(`> Executing ${sql}`)
        client.query(sql, (err, r) => {
            if (err){
                console.log(`! Error select from table albumImg `)
                console.log(err)
                return res.json({status:2}).status(500)
            }
    
            console.log(`> Success select from table albumImg`)
            console.log({status:1, info: r})
            res.json({status:1, info:r})
        })
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }             
};

//updateData
const update = (table, tableId, campos, res) => {
    try {  
        const sql = `UPDATE ${table} SET ${campos.data} WHERE ${tableId}=${campos.id}`
        console.log(`> Executing ${sql}`)
        client.query(sql, (err, r) => {
            if (err){
                console.log(`! Error updating to table ${table}`)
                console.log(err)
                return res.json({status:2}).status(500)
            }
            console.log(`> Success updating to table ${table}`)
            console.log(r)
            res.json({status:1})
        })         
    } catch (error) {
        console.log(error)
        res.json({status:3})
    }             
};
//deleteAccount
const deleteAccount = (datos, res) => {
    try {  
        const sqlA = `SELECT idAlbum FROM album WHERE idUserA='${datos.id}'`                
        console.log(`> Executing ${sqlA}`)
        client.query(sqlA, (err, albumes) => {
            if (err){
                console.log(`! Error on delete table ${table}`)
                console.log(err)
                return res.json({status:2}).status(500)
            }
                albumes.forEach(element => {
                    const sqlU = `DELETE FROM albumImg WHERE idAlbumU = '${element.idAlbum}'` 
                    console.log(`> Executing ${sqlU}`)
                    client.query(sqlU, (err, r1) => {
                        if (err){
                            console.log(`! Error on delete  table ${table}`)
                            console.log(err)
                            return res.json({status:2}).status(500)
                        }         
                    })
                }); 
                const sqlEA = `DELETE FROM album WHERE idUserA='${datos.id}'` 
                console.log(`> Executing ${sqlEA}`)
                client.query(sqlEA, (err, r2) => {
                if (err){
                    console.log(`! Error on delete table ${table}`)
                    console.log(err)
                    return res.json({status:2}).status(500)
                }
                    const sqlI = `DELETE FROM imagenes WHERE idUserI='${datos.id}'` 
                    console.log(`> Executing ${sqlI}`)
                    client.query(sqlI, (err, r3) => {
                    if (err){
                        console.log(`! Error on delete table ${table}`)
                        console.log(err)
                        return res.json({status:2}).status(500)
                    }
                        const sqlUs = `DELETE FROM user WHERE idUser='${datos.id}'` 
                        console.log(`> Executing ${sqlUs}`)
                        client.query(sqlUs, (err, r4) => {
                        if (err){
                            console.log(`! Error on delete table ${table}`)
                            console.log(err)
                            return res.json({status:2}).status(500)
                        }
                        res.json({status:1, message:'all deleted'})
                        })                    
                    })
                })
        })
    } catch (error) {
        console.log(error)
        res.json({message:error})
    } 
}
//deleteAlbum  
const deleteAlbum = (datos, res) => {
    try {  
        const sql = `DELETE FROM album WHERE idAlbum = '${datos.id}'` 
        const sql2 = `DELETE FROM albumImg WHERE idAlbumU = '${datos.id}'` 

        console.log(`> Executing ${sql}`)
        // Eliminar el album
        client.query(sql, (err, r) => {
            if (err){
                console.log(`! Error delete from table album`)
                console.log(err)
                return res.json({status:2}).status(500)
          }

        // Desvincular las imagenes de ese album
          client.query(sql2, (err, r) => {
            if (err){
                console.log(`! Error delete from table albumImg`)
                console.log(err)
                return res.json({status:2}).status(500)
            }
            console.log(`> Success delete to table albumImg`)
            res.json({
                info:r,
                status:1
            })
        })   

          
        })   
    } catch (error) {
        console.log(error)
        res.json({message:error})
    } 
}
//deleteImageFromAlbum
const deleteImageFromAlbum = (datos, res) => {
    try {  
        const sql = `DELETE FROM albumImg WHERE idAlbumU='${datos.idA}' and idImgU='${datos.idI}'`
        console.log(`> Executing ${sql}`)
        // Eliminar La union del album con img 
        /client.query(sql, (err, r) => {
            if (err){
                console.log(`! Error delete from table albumImg`)
                console.log(err)
                return res.json({status:2}).status(500)
          }
          res.json({
            info:r,
            status:1
            }) 
        })   
    } catch (error) {
        console.log(error)
        res.json({message:error})
    } 
}

const deleteImageFromAlbumWithoutId = (datos, res) => {
    try {  
        const sql = `DELETE FROM albumImg WHERE idImgU='${datos.idI}'`
        console.log(`> Executing ${sql}`)
        // Eliminar La union del album con img 
        /client.query(sql, (err, r) => {
            if (err){
                console.log(`! Error delete from table albumImg`)
                console.log(err)
                return res.json({status:2}).status(500)
          }
          res.json({
            info:r,
            status:1
            }) 
        })   
    } catch (error) {
        console.log(error)
        res.json({message:error})
    } 
}


//obtener uno por alguna columna
const oneData = (table, tableid, id, res) => {
    try {
        axios
        .post(api+'/getData', {
            table,
            id,
            tableid
            })
        .then(result => {
        console.log(result.data)
        res.json({
            info:result.data,
            status:1
        })
        })
        .catch((error)=>{res.status(400).json({status:2,message:error}); console.log(error)})   
    } catch (error) {
        res.status(400).json({Error:error, status:3})
        console.log(error)
    }   
}

function verifyToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, String(process.env.TOKEN_SECRET), (err, user) => {
      if (err!=null) {
          console.log('desde token')
        console.log(err)  
      }

      if (err) return res.sendStatus(403)
      
      next()
    })
}
app.use(express.static(path.join(__dirname, 'build')))
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.listen(3001, function(){
    console.log("nodejs running on 3001")
})

/*
falta cambiar el token *Angel
verificar que todos los select de la bd se hagan por cloud function *Rircardo
agregar la foto al album *angel


aplicar monitoring y subuir ya finalizada la app* Ricardo y angel
habilitar permisos unicamente necesarios *Ricardo
*/