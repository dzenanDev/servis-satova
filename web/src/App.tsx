import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';

import RenderRouter from './routes';
import i18next from '~/utils/localization';
import { I18nextProvider } from 'react-i18next';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={enUS} componentSize="middle">
      <I18nextProvider i18n={i18next}>
        <BrowserRouter>
          <RenderRouter />
        </BrowserRouter>
      </I18nextProvider>
    </ConfigProvider>
  );
};

export default App;
