import React, { useEffect, useState } from "react";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import Swal from 'sweetalert2'
import api from "../../api";

export const AppScreen = () => {
  const [userData] = useSessionStorage("user", {});
  const [albumList] = useSessionStorage("albums", {});
  const [photos, setPhotos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState({});
  const [view, setView] = useState(false);
  const [viewAlbum, setViewAlbum] = useState(false);
  const [album, setAlbum] = useState("");

  const { idUser, name, username, biografia, gravatar } = userData;

  const handleViewPhoto = (photo) => {
    setCurrentPhoto(photo);
    setView(true);
  };

  const handleAddPhotoToFavorites = async () => {
    let data = await api.image.addFavorite({
      id: currentPhoto.idImg,
      data: `favorito = '1'`,
    });
    setCurrentPhoto((prev) => ({ ...prev, favorito: 1 }));
  };

  const handleRemovePhotoFromFavorites = async () => {
    let data = await api.image.addFavorite({
      id: currentPhoto.idImg,
      data: `favorito = '0'`,
    });

    setCurrentPhoto((prev) => ({ ...prev, favorito: 0 }));
  };

  const handleAddPhotoToAlbum = async() => {
  
    await api.image.deleteFromalbum({
      idI: currentPhoto.idImg,
    })

    let dat = await api.union.insert({
      values: [album, currentPhoto.idImg]
    })

    Swal.fire('Photo added to album', '', 'success')

  };

  useEffect(() => {
    const fetchPhotos = async () => {
      let data = await api.controlAlbum.getPhotos({
        id: idUser,
      });

      if (parseInt(data.status) === 1) {
        setPhotos(data.info);
      } else {
        console.log(data.message);
      }
    };
    fetchPhotos();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      let data = await api.controlAlbum.getphoto2({
        id:idUser
      })
  
      if(parseInt(data.status) === 1) {
        setPhotos(data.info);
      }else{
        console.error('Error:', data);
  
      }
    }
    fetchData() 
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

            <div className="px-4 py-3">
              <h5 className="mb-0">Biography</h5>
              <div className="p-4 rounded shadow-sm bg-light">{biografia}</div>
            </div>

            <div className="py-4 px-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0">Albums</h5>
              </div>
              <div className="row ">
                {albumList.map((album) => (
                  <a
                    href={`/album/${album.idAlbum}`}
                    className=" album-card col-lg-4 mb-2"
                  >
                    <h3>{album.name}</h3>
                  </a>
                ))}
              </div>
            </div>
            <div className="py-4 px-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0">Photos</h5>
              </div>
              <div className="row ">
                {photos.map((photo) => (
                  <div
                    className="col-lg-4 mb-2 pr-lg-1 app-image"
                    onClick={() => handleViewPhoto(photo)}
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
                onClick={() => setViewAlbum((prev) => !prev)}
                type="button"
                className="btn btn-primary"
              >
                Add to album
              </button>
              {currentPhoto.favorito === 1 ? (
                <button
                  onClick={handleRemovePhotoFromFavorites}
                  type="button"
                  className="btn btn-warning"
                >
                  Remove from favorites
                </button>
              ) : (
                <button
                  onClick={handleAddPhotoToFavorites}
                  type="button"
                  className="btn btn-danger"
                >
                  Add to favorite
                </button>
              )}

              <button
                onClick={() => setView(false)}
                type="button"
                className="btn btn-secondary"
              >
                Close
              </button>

              {viewAlbum && ( 
                <>
                  <select
                    onChange={(e) => setAlbum(e.target.value)}
                    className="form-control"
                  >
                    <option value="-">
                      ------------------- No album -------------------
                    </option>
                    {albumList.map((album) => (
                      <option value={album.idAlbum}>{album.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={handleAddPhotoToAlbum}
                    className="btn btn-success"
                  >
                    Add
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
