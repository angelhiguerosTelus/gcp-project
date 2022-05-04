import React from "react";
export const Navbar = () => {
  const handleLogout = () => {
    document.cookie = `token={}`;   
    window.location.href = "http://34.138.192.177/close";
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
              <a className="nav-link" href="http://34.138.192.177/album">
                Album
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://34.138.192.177/favorites">
                Favorites
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://34.138.192.177/app/images">
                New images
              </a>
            </li>
          </ul>
          <button onClick={handleLogout} className="btn btn-danger btn-sg mx-3">
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};
