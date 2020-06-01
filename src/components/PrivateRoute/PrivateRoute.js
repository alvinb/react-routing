import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function PrivateRoute({ component: Component, user, isInRegion, ...rest }){
  return (
    <Route {...rest} render={(props) => {
      console.log(user.userName);
      if(!isInRegion){
        return (
          <Redirect
            to={{
              pathname: '/geo',
            }}
          />
        );
      }
      if (isInRegion && user.userName) {
        return <Component {...rest} {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        );
      }}}
    />
  );
};