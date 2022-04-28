import React from "react";
import api from "../../api";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";

export const LoginScreen = () => {
  const [values, handleInputChange, reset] = useForm({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // let data = await api.users.login({
    //   username: values.username,
    //   password: values.password,
    // });

    if (true) {
      // if (data.state) {
      window.location.href = "/app";
    } else {
      Swal.fire("User or passsword not valid", "", "error");
    }
  };

  return (
    <>
      <div class="sidenav">
        <div class="login-main-text">
          <h2>
            GCP
            <br /> Project
          </h2>
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
