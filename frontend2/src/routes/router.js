import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { AppScreen } from "../components/app/appScreen";
import { Navbar } from "../components/app/navbar";

export const Router = () => {
  const [userD] = useSessionStorage("user", {});
  return (
    <BrowserRouter>
      <div>
          <Navbar />
        <Switch>
        <Route exact path="/" component={AppScreen} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
