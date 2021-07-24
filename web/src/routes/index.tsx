import React, { lazy, FC } from 'react';

import LayoutPage from '~/layouts/MainLayout';

import PrivateRouteWrapper from './PrivateRouteWrapper';
import PublicRouteWrapper from './PublicRouteWrapper';
import { useRoutes } from 'react-router-dom';

import Naslovna from '~/pages/Naslovna';
import EditPage from '~/pages/Rezervni/EditDio';
import Rezervni from '~/pages/Rezervni';
import Narudbe from '~/pages/Narudbe';
import LoginPage from '~/pages/LoginPage';
import RegisterPage from '~/pages/RegisterPage';
import NewRezervni from '~/pages/NewRezervi';
import Reversi from '~/pages/Reversi';
import NewRevers from '~/pages/NewRevers';
import NewNarudba from '~/pages/NewNarudba';

const NotFound = lazy(
  () => import(/* webpackChunkName: "404'"*/ '~/pages/404')
);

export const routeList = [
  {
    path: '',
    element: <PublicRouteWrapper />,
    children: [
      {
        path: '',
        element: <PublicRouteWrapper element={<LoginPage />} />,
      },
      {
        path: 'login',
        element: <PublicRouteWrapper element={<LoginPage />} />,
      },
      {
        path: 'register',
        element: <PublicRouteWrapper element={<RegisterPage />} />,
      },
    ],
  },
  {
    path: '',
    element: <PrivateRouteWrapper element={<LayoutPage />} />,

    children: [
      {
        path: 'Naslovna',
        element: <PrivateRouteWrapper element={<Naslovna />} />,
      },
      {
        path: 'Rezervni',
        children: [
          {
            path: '/',
            element: <PrivateRouteWrapper element={<Rezervni />} />, //ovdje
          },

          {
            path: ':itemId',
            element: <PrivateRouteWrapper element={<EditPage />} />,
          },
        ],
      },
      {
        path: 'NewRezervni',
        children: [
          {
            path: '/',
            element: <PrivateRouteWrapper element={<NewRezervni />} />,
          },
        ],
      },
      {
        path: 'Narudbe',
        children: [
          {
            path: '/',
            element: <PrivateRouteWrapper element={<Narudbe />} />,
          },
        ],
      },
      {
        path: 'Reversi',
        children: [
          {
            path: '/',
            element: <PrivateRouteWrapper element={<Reversi />} />,
          },
        ],
      },

      {
        path: 'NewRevers',
        children: [
          {
            path: '/',
            element: <PrivateRouteWrapper element={<NewRevers />} />,
          },
        ],
      },
      {
        path: 'NewNarudba',
        children: [
          {
            path: '/',
            element: <PrivateRouteWrapper element={<NewNarudba />} />,
          },
        ],
      },

      {
        path: '*',
        element: <PrivateRouteWrapper element={<NotFound />} />,
      },
    ],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
