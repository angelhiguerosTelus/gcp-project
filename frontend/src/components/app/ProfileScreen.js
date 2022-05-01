import React, { useState } from "react";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import api from "../../api";

export const ProfileScreen = () => {
  const [userD, setUserD] = useSessionStorage("user", {});
  const [userData, setUserData] = useState("user", userD);
  const { idUser, name, username, biografia, gravatar, password } = userData;

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = () => {};

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
                <h5 className="mb-0">Information</h5>
              </div>
              <div className="row ">
                <form>
                  <div class="form-group">
                    <label for="exampleFormControlInput1">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      value={name}
                      name="name"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlInput1">Username</label>
                    <input
                      type="text"
                      class="form-control"
                      value={username}
                      name="username"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlInput1">Biography</label>
                    <input
                      type="text"
                      class="form-control"
                      value={biografia}
                      name="biografia"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlInput1">Gravatar link</label>
                    <input
                      type="link"
                      class="form-control"
                      value={gravatar}
                      name="gravatar"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlInput1">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      value={password}
                      name="password"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div class="form-group">
                    <button className="btn btn-success">Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
