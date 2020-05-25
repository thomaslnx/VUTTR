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
        <meta
          name="google-site-verification"
          content="Gx1EvYN_thT7bHiq0b2kVFiocB6RbTetFoemmA1hG-8"
        />
        link =
        {[{ rel: 'canonical', href: 'https://thomaslnx-vuttr.netlify.app/' }]}
      </Helmet>
      <GlobalStyles />
      <Routes />
    </>
  );
}

export default App;
