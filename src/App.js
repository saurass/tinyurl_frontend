import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import NavComponent from './components/core/nav/NavComponent';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import HomeComponent from './components/home/HomeComponent';
import FooterComponent from './components/core/footer/FooterComponent';
import NotFoundComponent from './components/error/404/NotFoundComponent';
import SignInComponent from './components/auth/signin/SignInComponent/SignInComponent';
import SignUpComponent from './components/auth/signup/SignUpComponent/SignUpComponent';
import AuthRoute from './services/protectedRoutes/AuthRoute';
import LogoutComponent from './components/auth/Logout/LogoutComponent';
import TinyUrlComponent from './components/tinyurl/TinyUrlComponent';
import RedirectComponent from './components/redirect/RedirectComponent';

function App() {
  return (
    <BrowserRouter>
      <NavComponent></NavComponent>
      
      <Switch>

        <Route exact path="/">
          <HomeComponent></HomeComponent>
        </Route>

        <Route exact path="/signin">
          <SignInComponent></SignInComponent>
        </Route>

        <Route exact path="/signup">
          <SignUpComponent></SignUpComponent>
        </Route>

        <AuthRoute path="/logout">
          <LogoutComponent></LogoutComponent>
        </AuthRoute>

        <AuthRoute path="/tinyurl">
          <TinyUrlComponent></TinyUrlComponent>
        </AuthRoute>

        <Route exact path="/:tinyhash">
          <RedirectComponent></RedirectComponent>
        </Route>

        <Route>
          <NotFoundComponent></NotFoundComponent>
        </Route>

      </Switch>


      <FooterComponent></FooterComponent>
    </BrowserRouter>
  );
}

export default App;
