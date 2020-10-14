import React, { useEffect, useState } from 'react';
import { Switch, Link } from 'react-router-dom';

import './app.scss';

import DatabaseContextProvider from 'src/context/databaseContext';
import { TokenService, UserService } from 'src/services';

import { Button } from 'src/components/utils';
import { Header } from 'src/components';
import {
  LoginPage,
  HomePage,
  SongsPage,
  SetsPage,
  GigsPage,
  PrivateRoute,
  PublicRoute
} from 'src/routes';

const App = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getUserName = async (authToken) => {
      try {
        const { username } = await UserService.authLogin(authToken);

        if (!username) return TokenService.clearAuthToken();

        return setUserName(username);
      } catch (error) {
        TokenService.clearAuthToken();
        return console.log(error);
      }
    };

    const authToken = TokenService.getAuthToken();
    if (authToken) getUserName(authToken);
    TokenService.clearAuthToken();
  }, []);

  const handleLoginSuccess = (user_name) => {
    setUserName(user_name);
  };

  const handleLogout = () => {
    setUserName('');
  };

  return (
    <div className="app">
      <Header userName={userName} logout={handleLogout} />
      <main className="main-container">
        <DatabaseContextProvider userName={userName}>
          <Switch>
            <PublicRoute
              path="/login"
              component={LoginPage}
              loginSuccess={handleLoginSuccess}
            />
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/songs" component={SongsPage} />
            <PrivateRoute path="/sets" component={SetsPage} />
            <PrivateRoute path="/gigs" component={GigsPage} />
          </Switch>
        </DatabaseContextProvider>
      </main>
    </div>
  );
};

export default App;
