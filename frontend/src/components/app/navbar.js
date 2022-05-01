import React from 'react'

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
        <a className="navbar-brand" href="/app">Image</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <a className="nav-link" href="/app/images">New images</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="/app">Album</a>
            </li>
        </ul>
        <button className='btn btn-danger btn-sg'>
            Log out
        </button>
        </div>
    </div>
    </nav>
  )
}
