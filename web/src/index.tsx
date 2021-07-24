import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import * as serviceWorker from './serviceWorker';
import App from './App';

const render = (Router: React.FC) => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);

// hmr enable
if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./App', () => {
    const Router = require('./App').default;
    render(Router);
  });
}

serviceWorker.unregister();
