import React, {useState} from 'react'
import img from '../images/addimages.png'
import ImageUploading from 'react-images-uploading';
import Swal from "sweetalert2";
import api from "../../api";
export const AddImages = () => {
    const apilink=process.env.REACT_APP_BACK
    const [images, setImages] = React.useState([]);
    const [datos, setDatos]=useState({
                                        description:"",
                                        nameAlbum:"",
                                        isfavorito:false,
                                        newAlbum:false,
                                    })
const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

const handleReset=()=>{
    setDatos({ description:"", nameAlbum:"", isfavorito:false, newAlbum:false})
    setImages([])
} 
const handleSubmit = async (e) => {
    e.preventDefault();    
    const prov=datos.isfavorito===true?(1):(0)
    const data_to_save=[datos.description, parseInt(prov),1,2]
    console.log(datos)
    if (images.length===0) {
        Swal.fire('There is no image to upload', "", "error");
        return            
    } else if (datos.newAlbum===true && datos.nameAlbum===""){
        Swal.fire('Add name of the new album', "", "error");
        return            
    }      
    try {
        const data = new FormData()
        data.append('file', images[0].file)
        const res= await fetch(apilink+'/upload',{method:'POST', body:data})
        const file=await res.json()
        data_to_save[2]=file.link;           
    } catch (error) {
        Swal.fire('Something bad happen on the server (image)', "", "error");
        console.log(error)
        return
    }  
    try {
       const result = await api.image.addImage({values:data_to_save,});      
        if (result.status===2) {
            Swal.fire('Something bad happen on the server (main)', "", "error");
            return
        } 
        if (datos.nameAlbum!=="") {
            saveInAlbum(result.id)              
           } else {
            Swal.fire("Image added successfuly", "", "success")
            handleReset()
           }
    } catch (error) {
        Swal.fire('Something bad happen on the server (main)', "", "error");
        console.log(error)
        return
    }                            
       
    };

    const saveInAlbum=async(id)=>{
        let data=[]
        let data2=[]
        let union=[datos.nameAlbum,id]
        try {
            if (datos.newAlbum===true && datos.nameAlbum!=="") {
                data = await api.controlAlbum.createNewAlbum({
                    values: [
                      datos.nameAlbum,
                      2
                    ],
                  });          
                  union[0]=data.id
                console.log('album nuevo creado: '+datos.nameAlbum+" id:"+data.id)
            }
            data2 = await api.union.insert({
                values: 
                  union
                ,
              });          
              console.log('union creada: album id '+union[0]+" union id:"+data2.id)
            if (parseInt(data2.status) === 1) {
                Swal.fire("User created successfuly", "", "success");
                handleReset()
              } else {
                Swal.fire('cannot add image to album', "", "error");
                return
              }        
        } catch (error) {
            Swal.fire('Something bad happen on the server (album)', "", "error");
            console.log(error)
            return 
        }
       
    }
  return (
    <div className="container-fluid">
        <div className='row'>
            <div className='col-12 col-md-8 px-5 pt-5'>
                <div className='row'>
                    <div className='col-12'>
                    <center>
                        {images.length===0&&(<><img src={img} className="img-fluid" alt="..."/> </>)}
                            <ImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            maxNumber={1}
                            dataURLKey="data_url"
                            >
                            {({
                            imageList, onImageUpload, onImageRemoveAll,onImageUpdate,onImageRemove,isDragging, dragProps,
                            }) => (
                            <div className="upload__image-wrapper w-100">
                                {images.length===0&&(
                                    <button
                                    className="btn btn-primary mb-3"
                                    style={isDragging ? { color: 'red' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    >
                                    Click or Drop here
                                    </button>
                                )}                            
                                {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image['data_url']} alt="" className='img-fluid w-100 h-100' />
                                    <div className="image-item__btn-wrapper">
                                        <button 
                                        type='button'
                                        onClick={() => onImageRemove(index)}
                                        className="btn btn-danger mt-3"
                                        >Remove</button>
                                    </div>
                                </div>
                                ))}
                            </div>
                            )}
                            </ImageUploading>
                        </center>
                    </div>
                </div>
            </div>
            <div className='col-12 col-md-4 px-5 d-flex align-items-center justify-content-center my-5'>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <textarea 
                    name='description'
                    className="form-control" 
                    placeholder="Write a description" 
                    onChange={(e)=> setDatos({ ...datos, description:e.target.value })}
                    style={{height:'200px'}}
                    value={datos.description}
                    id="textarea"/>                       
                </div>
                <div className="form-group d-flex justify-content-center my-5">
                    <label>Favorite?</label>
                    <input 
                    name='isfavorito'
                    className="form-check-input mx-3" 
                    type="checkbox" 
                    checked={datos.isfavorito}
                    onChange={()=> setDatos({ ...datos, isfavorito:!datos.isfavorito })}
                    id="favorito"/>
                </div>                                   
                    {datos.newAlbum===false&&(
                        <>
                        <div className='form-check form-switch d-flex justify-content-center w-100 my-5'>                   
                            <div className="form-floating mb-3 w-100">
                            <select className="form-select form-select-sm" onChange={(e)=> setDatos({ ...datos, nameAlbum:e.target.value })}>
                                <option value='0' >add to album?</option>
                                <option value="1">Need to be implement</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            </div>
                            </div>  
                        </>
                    )}                
                <div className='form-check form-switch d-flex justify-content-center w-100 my-5'>                   
                    {datos.newAlbum===false?(
                    <>
                        <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={datos.newAlbum}
                        onChange={()=> setDatos({ ...datos, newAlbum:!datos.newAlbum })}/>
                        <label className="form-check-label mx-3" htmlFor="flexSwitchCheckChecked">Save in new album?</label>
                    </>
                    ):(
                        <>
                            <div className="form-floating mb-3 w-100">
                                <input 
                                onChange={(e)=> setDatos({ ...datos, nameAlbum:e.target.value })}
                                type="text" 
                                className="form-control w-100" 
                                id="newAlbum"/>
                                <label htmlFor="newAlbum">Name for album</label>
                            </div>
                        </>
                    )}
                </div> 
                <div className='d-flex align-items-center w-100 my-5'>
                    <button type="submit" className="btn btn-success btn-lg text-white mx-5 w-50">
                        Save
                    </button>
                    <button type="button" onClick={handleReset} className="btn btn-warning btn-lg text-white mx-5 w-50">
                        reset
                    </button>
                </div>            
                </form>                
            </div>
        </div>
    </div>
  )
}
