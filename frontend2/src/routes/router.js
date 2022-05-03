import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { AppScreen } from "../components/app/appScreen";
import { Navbar } from "../components/app/navbar";

export const Router = () => {
  const [userD] = useSessionStorage("user", {});
  const PrivateRoute = ({ comp: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        userD.idUser === 0 || String(userD.idUser) === "undefined" ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
  return (
    <BrowserRouter>
      <div>
        {userD.idUser !== 0 && String(userD.idUser) !== "undefined" && (
          <Navbar />
        )}
        <Switch>
          <PrivateRoute exact path="/" comp={AppScreen} />
          {/* Cambiar por ip de la app1 */}
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
