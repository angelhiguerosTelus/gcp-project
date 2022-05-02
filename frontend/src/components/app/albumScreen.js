import React, { useEffect, useState } from "react";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import Swal from "sweetalert2";
import api from "../../api";

export const AlbumScreen = () => {
  const [userData] = useSessionStorage("user", {});
  const [albumList, setAlbumList] = useSessionStorage("albums", {});
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState({});
  const [albumToRemove, setAlbumToRemove] = useState({});
  const [view, setView] = useState(false);
  const [view2, setView2] = useState(false);

  const { idUser, name, username, gravatar } = userData;

  const handleView = () => {
    setView(true);
  };

  const handleView2 = () => {
    setView2(true);
  };

  const createAlbum = async () => {
    let data = await api.controlAlbum.createNewAlbum({
      values: [newAlbum, idUser],
    });

    if (parseInt(data.status) === 1) {
      Swal.fire("Album created succesfully", "", "success").then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire(data.message, "", "error");
    }
  };

  const removeAlbum = async () => {
    let data = await api.controlAlbum.removeAlbum({
      id: albumToRemove,
    });

    if (parseInt(data.status) === 1) {
      Swal.fire("Album deleted succesfully", "", "success").then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire(data.message, "", "error");
    }
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      let data = await api.controlAlbum.getAlbums({
        id: idUser,
      });

      if (parseInt(data.status) === 1) {
        setAlbums(data.info);
        setAlbumList(data.info);
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
                  <a
                    href={`/album/${album.idAlbum}`}
                    className=" album-card col-lg-4 mb-2"
                  >
                    <h3>{album.name}</h3>
                  </a>
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
            <div className="modal-header">
              <h3>Add new album</h3>
            </div>
            <div className="modal-body">
              <label htmlFor="">Name</label>
              <input
                onChange={(e) => setNewAlbum(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="modal-footer">
              <button
                onClick={createAlbum}
                type="button"
                className="btn btn-success"
              >
                ADD
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

      {/* Remove modal */}
      <div
        className="modal"
        style={{
          display: view2 ? "block" : "none",
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
            <div className="modal-header">
              <h3>Remove album</h3>
            </div>
            <div className="modal-body">
              <label htmlFor="">Select an album to remove</label>
              <select
                onChange={(e) => setAlbumToRemove(e.target.value)}
                className="form-control"
              >
                <option value="-" selected disabled>
                  --------
                </option>
                ;
                {albums.map((album) => (
                  <option value={album.idAlbum}>{album.name}</option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button
                onClick={removeAlbum}
                type="button"
                className="btn btn-danger"
              >
                REMOVE
              </button>
              <button
                onClick={() => setView2(false)}
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
