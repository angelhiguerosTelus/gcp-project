import React from "react";
import api from "../../api";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import bg from "../../assets/img/background.png";

export const LoginScreen = () => {
  const [values, handleInputChange, reset] = useForm({});
  const [userData, setUserData] = useSessionStorage("user", {});
  const [albumList, setAlbumList] = useSessionStorage("albums", {});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = await api.users.login({
      username: values.username,
      pass: values.password,
    });

    if (data.status === 1) {
      // Inicio de sesión correcto

      let data2 = await api.controlAlbum.getAlbums({
        id: data.info[0].idUser,
      });

      document.cookie = `token=${data.token}`;

      setUserData(data.info[0]);
      setAlbumList(data2.info);

      window.location.href = "/app";
    } else if (data.status === 2) {
      Swal.fire(data.message, "", "warning");
    } else {
      Swal.fire(data.message, "", "error");
    }
  };

  return (
    <>
      <div
        class="sidenav"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg})`,
          backgroundColor: "black",
        }}
      >
        <div class="login-main-text">
          <h1>
            GCP
            <br /> Project
          </h1>
          <p>Login or register from here to access.</p>
        </div>
      </div>
      <div class="main">
        <div class="col-md-6 col-sm-12">
          <div class="login-form">
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label>User Name</label>
                <input
                  name="username"
                  onChange={handleInputChange}
                  type="text"
                  class="form-control"
                  required
                  placeholder="User Name"
                />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  name="password"
                  onChange={handleInputChange}
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <br />
              <button type="submit" class="btn btn-black text-white">
                Login
              </button>
              <a href="/signup" class="btn btn-secondary">
                Register
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
