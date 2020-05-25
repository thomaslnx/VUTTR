import React from 'react';
import { Helmet } from 'react-helmet';

import Routes from './routes';
import GlobalStyles from './styles/global';

function App() {
  return (
    <>
      <Helmet>
        <title>VUTTR - Very Useful Tool To Remember</title>
        <meta
          name="description"
          content="Bossabox's pro-lancer application project"
        />
      </Helmet>
      <GlobalStyles />
      <Routes />
    </>
  );
}

export default App;
