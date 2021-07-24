import React, { FC } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { store } from '../redux/store';

const PublicRouteWrapperComponent: FC<RouteProps> = ({ ...props }) => {
  const isAuth = store.getState().auth.isAuth;

  return isAuth ? <Navigate to="/Naslovna" /> : <Route {...props} />;
};

export default PublicRouteWrapperComponent;
