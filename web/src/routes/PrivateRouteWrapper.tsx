import React, { FC } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { store } from '../redux/store';

const PrivateRouteWrapperComponent: FC<RouteProps> = ({ ...props }) => {
  const isAuth = store.getState().auth.isAuth;

  return isAuth ? <Route {...props} /> : <Navigate to="/login" />;
};

export default PrivateRouteWrapperComponent;
