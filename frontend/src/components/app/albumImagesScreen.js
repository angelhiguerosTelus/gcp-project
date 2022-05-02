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
    fetchPhotos();
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
        class="modal"
        style={{
          display: view ? "block" : "none",
          backgroundColor: "#000000cf",
        }}
      >
        <div class="modal-dialog">
          <div
            class="modal-content"
            style={{
              width: "730px",
            }}
          >
            <div class="modal-body">
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
            <div class="modal-footer">
              {currentPhoto.favorito === 1 ? (
                <button
                  onClick={handleRemovePhotoFromFavorites}
                  type="button"
                  class="btn btn-warning"
                >
                  Remove from favorites
                </button>
              ) : (
                <button
                  onClick={handleAddPhotoToFavorites}
                  type="button"
                  class="btn btn-danger"
                >
                  Add to favorite
                </button>
              )}
              <button
                onClick={() => setView(false)}
                type="button"
                class="btn btn-secondary"
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
