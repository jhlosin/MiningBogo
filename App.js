// Imports
import React from 'react';
import { Provider } from 'react-redux';

// App Imports
import Main from './src'
import configureStore from './src/configureStore';

const store = configureStore();

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);
