import React from "react";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import api from "../../api";
import bg from "../../assets/img/background2.png";

export const SignUpScreen = () => {
  const [values, handleInputChange, reset] = useForm({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = await api.users.create({
      values: [
        values.name,
        values.username,
        values.password,
        values.biography,
        values.gravatar,
      ],
    });

    if (parseInt(data.status) === 1) {
      Swal.fire("User created successfuly", "", "success").then(() => {
      {/* Cambiar por ip de la app2 */}
        window.location.href = "/app";
      });
    } else {
      Swal.fire(data.message, "", "error");
    }
  };

  return (
    <>
      <div
        className="sidenav"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg})`,
          backgroundColor: "black",
        }}
      >
        <div className="login-main-text">
          <h1>
            GCP
            <br /> Project
          </h1>
          <p>Login or register from here to access.</p>
        </div>
      </div>
      <div className="main">
        <div className="col-md-6 col-sm-12">
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  name="name"
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  required
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  required
                  placeholder="Username"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  name="password"
                  onChange={handleInputChange}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-group">
                <label>Biography</label>
                <input
                  name="biography"
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  required
                  placeholder="Biography"
                />
              </div>
              <div className="form-group">
                <label>Gravatar</label>
                <input
                  name="gravatar"
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  required
                  placeholder="Gravatar link"
                />
              </div>
              <br />
              <button type="submit" className="btn btn-black text-white">
                Register
              </button>
              <a href="/" className="btn btn-secondary">
                Go back
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
