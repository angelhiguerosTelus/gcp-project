import React from "react";
import { useSessionStorage } from "../../hooks/useSessionStorage";

export const Navbar = () => {
  const [userData] = useSessionStorage("user", {});

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
              <a className="nav-link active" aria-current="page" href="/app">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/album">
                Album
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/favorites">
                Favorites
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/app/images">
                New images
              </a>
            </li>
          </ul>
          <a href="/profile" className="btn btn-primary">{userData.username}</a>
        </div>
      </div>
    </nav>
  );
};
