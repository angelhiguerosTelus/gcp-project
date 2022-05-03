import React from "react";
import { useSessionStorage } from "../../hooks/useSessionStorage";
export const Navbar = () => {
  const [userData, setUserData] = useSessionStorage("user", {});
  const handleLogout = () => {
    setUserData({});
    document.cookie = `user={}`;   
    window.location.href = "http://35.237.144.245/close";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          GCP Project
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/" >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://35.237.144.245/album">
                Album
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://35.237.144.245/favorites">
                Favorites
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://35.237.144.245/app/images">
                New images
              </a>
            </li>
          </ul>
          <a href="/profile" className="btn btn-primary">
            {userData.username}
          </a>
          <button onClick={handleLogout} className="btn btn-danger btn-sg mx-3">
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};
