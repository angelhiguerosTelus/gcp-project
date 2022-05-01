import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import { AppScreen } from '../components/app/appScreen'
import { AddImages } from '../components/app/addImages'
import { LoginScreen } from '../components/auth/loginScreen'
import { SignUpScreen } from '../components/auth/signUpScreen'
import { FavoritesScreen } from '../components/app/favoritesScreen'
import { AlbumScreen } from '../components/app/albumScreen'
import { ProfileScreen } from '../components/app/ProfileScreen'
import { AlbumImagesScreen } from '../components/app/albumImagesScreen'

export const Router = () => {
  return (

    <BrowserRouter >
    <div>
        <Switch>
            <Route exact path="/" component={LoginScreen} />
            <Route exact path="/signup" component={SignUpScreen} />
            <Route exact path="/app" component={AppScreen} />
            <Route exact path="/favorites" component={FavoritesScreen} />
            <Route exact path="/album" component={AlbumScreen} />
            <Route exact path="/profile" component={ProfileScreen} />
            <Route exact path="/album/:idAlbum" component={AlbumImagesScreen} />
            <Route exact path="/app/images" component={AddImages} />
            
            <Redirect to= '/' />

            
        </Switch>
    </div>
    </BrowserRouter>
    )
}
