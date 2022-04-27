import React from 'react'
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2'

export const SignUpScreen = () => {
  const [values, handleInputChange, reset] = useForm({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // let data = await api.users.create({
    //   name: values.name,
    //   username: values.username,
    //   password: values.password,
    //   biography: values.biography
    //   gravatar: values.gravatar
    // });

    if (true) {
      window.location.href = "/app";
    } else {
      Swal.fire("Error", "", "error");
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
                <label>Name</label>
                <input
                  name="name"
                  onChange={handleInputChange}
                  type="text"
                  class="form-control"
                  required
                  placeholder="Name"
                />
              </div>
              <div class="form-group">
                <label>Username</label>
                <input
                  name="username"
                  onChange={handleInputChange}
                  type="text"
                  class="form-control"
                  required
                  placeholder="Username"
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
              <div class="form-group">
                <label>Biography</label>
                <input
                  name="biography"
                  onChange={handleInputChange}
                  type="text"
                  class="form-control"
                  required
                  placeholder="Biography"
                />
              </div>
              <div class="form-group">
                <label>Gravatar</label>
                <input
                  name="gravatar"
                  onChange={handleInputChange}
                  type="text"
                  class="form-control"
                  required
                  placeholder="Gravatar link"
                />
              </div>
              <br />
              <button type="submit" class="btn btn-black text-white">
                Register
              </button>
              <a href="/" class="btn btn-secondary">
                Go back
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
