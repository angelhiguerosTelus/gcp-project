import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { AppScreen } from '../components/app/appScreen'
import { AddImages } from '../components/app/addImages'
import { LoginScreen } from '../components/auth/loginScreen'
import { SignUpScreen } from '../components/auth/signUpScreen'

export const Router = () => {
  return (

    <BrowserRouter >
    <div>
        <Switch>
            <Route exact path="/" component={LoginScreen} />
            <Route exact path="/signup" component={SignUpScreen} />
            <Route exact path="/app" component={AppScreen} />
            <Route exact path="/app/images" component={AddImages} />
        </Switch>
    </div>
    </BrowserRouter>
    )
}
