import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function PrivateRoute({children, ...rest}) {
  const user = useSelector(state => state.user);

  return (
    <Route
      {...rest}
      render={({location}) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: location},
            }}
          />
        )
      }
    />
  );
}
