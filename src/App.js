import React from 'react';
import { Helmet } from 'react-helmet';

import Routes from './routes';
import GlobalStyles from './styles/global';

function App() {
  return (
    <>
      <Helmet>
        <title>VUTTR - Very Useful Tool To Remember</title>
        <meta name="description" content="Very Useful Tool To Remember" />
      </Helmet>
      <GlobalStyles />
      <Routes />
    </>
  );
}

export default App;
