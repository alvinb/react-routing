import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function PublicRoute({ component: Component, isInRegion, user, ...rest }){
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isInRegion && !user.userName) {
          return <Component {...rest} {...props} />;
        } else if(isInRegion && user.userName){
          return (
            <Redirect
              to={{
                pathname: '/dashboard',
              }}
            />
          );
        }else {
          return (
            <Redirect
              to={{
                pathname: '/geo'
              }}
            />
          );
        }
      }}
    />
  );
};

