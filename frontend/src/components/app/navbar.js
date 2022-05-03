import React from "react";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { Link } from "react-router-dom";
export const Navbar = () => {
  const [userData, setUserData] = useSessionStorage("user", {});
  const handleLogout = () => {
    setUserData({});
    document.cookie = `user={}`;   
    document.cookie = `token={}`;   
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/app">
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
              {/* Cambiar por ip app 2 */}
              <a className="nav-link active" aria-current="page" href="http://localhost:3002/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/album">
                Album
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                Favorites
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/app/images">
                New images
              </Link>
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
