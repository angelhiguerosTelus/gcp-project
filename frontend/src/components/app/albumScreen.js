import React, { useEffect, useState } from "react";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import api from "../../api";

export const AlbumScreen = () => {
  const [userData] = useSessionStorage("user", {});
  const [albums, setAlbums] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState({});
  const [view, setView] = useState(false);
  const [view2, setView2] = useState(false);

  const { idUser, name, username, gravatar } = userData;

  const handleView = () => {
    setView(true);
  };

  const handleView2 = () => {
    setView2(true);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      let data = await api.controlAlbum.getAlbums({
        id: idUser,
      });
      console.log(data);

      if (parseInt(data.status) === 1) {
        setAlbums(data.info);
      } else {
        console.log(data.message);
      }
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
                <h5 className="mb-0">Albums</h5>
                <span>
                  <button
                    onClick={() => handleView()}
                    className="btn btn-success"
                  >
                    ADD
                  </button>
                  <button
                    onClick={() => handleView2()}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </span>
              </div>
              <div className="row ">
                {albums.map((album) => (
                  <div className="col-lg-4 mb-2 pr-lg-1 app-image">
                    <h3>{album.name}</h3>
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
            <div className="modal-header">
              <h3>Add new album</h3>
            </div>
            <div class="modal-body">
              <label htmlFor="">Name</label>
              <input type="text" className="form-control" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success">
                ADD
              </button>
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

      {/* Remove modal */}
      <div
        class="modal"
        style={{
          display: view2 ? "block" : "none",
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
            <div className="modal-header">
              <h3>Remove album</h3>
            </div>
            <div class="modal-body">
              <label htmlFor="">Name</label>
              <select name="" id="" className="form-control">
                <option value="">------</option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger">
                REMOVE
              </button>
              <button
                onClick={() => setView2(false)}
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
