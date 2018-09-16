import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, YellowBox } from 'react-native';

import Root from './App';
import configureStore from './src/redux/store';
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Possible Unhandled Promise Rejection'
]);

const store = configureStore({});
class App extends React.PureComponent {
    render() {
      return ( 
        <Provider store={store}>
            <Root/>
        </Provider>
      );
    }
}

AppRegistry.registerComponent('kredx', () => App);
