import React, { useEffect, useState } from "react";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import Swal from "sweetalert2";
import api from "../../api";

export const AlbumImagesScreen = ({ match: { params } }) => {
  const [idAlbum] = useState(params.idAlbum);
  const [userData] = useSessionStorage("user", {});
  const [album, setAlbum] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState({});

  const [view, setView] = useState(false);

  const { idUser, name, username, gravatar } = userData;

  const handleViewPhoto = (photo) => {
    setCurrentPhoto(photo);
    setView(true);
  };
  const handleQuitFromAlbum= async() => {
    let tempArray=[]
    let data = await api.image.deleteFromalbum({idA:idAlbum,idI:currentPhoto.idImg});
    if (data.status===1) {
      photos.forEach((element)=>(
        parseInt(element.idImg)!==parseInt(currentPhoto.idImg)&&(tempArray.push(element), console.log(element))      
      ))
      setPhotos(tempArray)
      Swal.fire('Done.', "", "success");    
  } else {
      Swal.fire('Something bad happen on the server (main)', "", "error");
  }          
  };

  const handleAddPhotoToFavorites = () => {
    // Los datos de la foto estan en "currentPhoto"
  };

  useEffect(() => {
    // Get album info
    const fetchAlbum = async () => {
      let data = await api.controlAlbum.getAlbumInfo(idAlbum);
      setAlbum(data.info[0]);
    };
    fetchAlbum();

    // Get photos in the album
    const fetchPhotos = async () => {
      let data = await api.controlAlbum.getAlbumPhotos(idAlbum);
      setPhotos(data.info);
    };
    fetchPhotos()
  }, []);

  return (
    <div>
      <div className="row py-5 px-4">
        <div className="col-md-9 mx-auto">
          <div className="bg-white shadow rounded overflow-hidden">
            <div className="px-4 pt-0 pb-4 cover">
              <div className="media align-items-end profile-head">
                <div className="profile mr-3">
                  <img
                    src={gravatar || `https://www.gravatar.com/avatar/?s=200`}
                    alt="gravatar"
                    width="130"
                    className="rounded mb-2 img-thumbnail"
                  />
                </div>
                <div className="media-body mb-5 text-white">
                  <h4 className="mt-0 mb-0">{name}</h4>
                  <p className="small mb-4">{username}</p>
                  <br />
                </div>
              </div>
            </div>

            <div className="py-4 px-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0">
                  Albums: <strong>{album.name}</strong>
                </h5>
              </div>
              <div className="row ">
                {photos.map((photo) => (
                  <div
                    className="col-lg-4 mb-2 pr-lg-1 app-image"
                    onClick={() => handleViewPhoto(photo)}  
                    key={photo.idImg}                  
                  >
                    <img
                      src={photo.URL}
                      alt={photo.descripcion}
                      className="img-fluid rounded shadow-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        className="modal"
        style={{
          display: view ? "block" : "none",
          backgroundColor: "#000000cf",
        }}
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              width: "730px",
            }}
          >
            <div className="modal-body">
              <center>
                <img
                  src={currentPhoto.URL}
                  alt={currentPhoto.descripcion}
                  width={700}
                />
              </center>
              <br />
              <p>{currentPhoto.descripcion}</p>
            </div>
            <div className="modal-footer">
            <button
                onClick={handleQuitFromAlbum}
                type="button"
                className="btn btn-danger"
              >
                Quit from this album
              </button>
              <button
                onClick={handleAddPhotoToFavorites}
                type="button"
                className="btn btn-danger"
              >
                Add to favorite
              </button>
              <button
                onClick={() => setView(false)}
                type="button"
                className="btn btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
