import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import { useSessionStorage } from "../hooks/useSessionStorage";
import { AppScreen } from '../components/app/appScreen'
import { AddImages } from '../components/app/addImages'
import { LoginScreen } from '../components/auth/loginScreen'
import { SignUpScreen } from '../components/auth/signUpScreen'
import { FavoritesScreen } from '../components/app/favoritesScreen'
import { AlbumScreen } from '../components/app/albumScreen'
import { ProfileScreen } from '../components/app/ProfileScreen'
import { AlbumImagesScreen } from '../components/app/albumImagesScreen'
import {Navbar} from '../components/app/navbar'

export const Router = () => {
    const [userD, setUserData] = useSessionStorage("user", {});
      const PrivateRoute = ({
        comp: Component,
        ...rest
      }) => (
        <Route
          {...rest}
          render={props =>(userD.idUser===0  || String(userD.idUser)==='undefined')? (
              <Redirect to="/login" />
            ) : (
              <Component {...props} />
            )
          }
        />
      );
      function Close(){
        setUserData({});
        document.cookie = `user={}`;   
        document.cookie = `token={}`; 
        window.location.href = "/";
      }
  return (
    <BrowserRouter >
    <div>
        {(userD.idUser!==0  && String(userD.idUser)!=='undefined')&&(
            <Navbar/>
        )}        
        <Switch>
            <Route exact path="/" component={LoginScreen} />
            <Route exact path="/close" component={Close} />
            <Route exact path="/signup" component={SignUpScreen} />

            <PrivateRoute exact path="/app" comp={AppScreen} />
            <PrivateRoute exact path="/favorites" comp={FavoritesScreen} />
            <PrivateRoute exact path="/album" comp={AlbumScreen} />
            <PrivateRoute exact path="/profile" comp={ProfileScreen} />
            <PrivateRoute exact path="/album/:idAlbum" comp={AlbumImagesScreen} />
            <PrivateRoute exact path="/app/images" comp={AddImages} />

            <Redirect to= '/' />
        </Switch>
    </div>
    </BrowserRouter>
    )
}
