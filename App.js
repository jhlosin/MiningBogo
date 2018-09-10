// Imports
import React from 'react';
import { Provider } from 'react-redux';
import { Container, StyleProvider} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

// App Imports
import Main from './src'
import configureStore from './src/configureStore';

const store = configureStore({});

export default () => (
  <Provider store={store}>
    <StyleProvider style={getTheme(material)}>
        <Main />
    </StyleProvider>
  </Provider>
);
