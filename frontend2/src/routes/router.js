import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AppScreen } from "../components/app/appScreen";
import { Navbar } from "../components/app/navbar";

export const Router = () => {
  return (
    <BrowserRouter>
      <div>
          <Navbar />
        <Switch>
        <Route exact path="/:iduser" component={AppScreen} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
