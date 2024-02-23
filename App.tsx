import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './src/navigator/navigator';
import { Provider } from 'react-redux';
import { store } from './src/store';

const App = () => {
  return (
    <SafeAreaProvider>
        <Provider store={store}>
          <Navigator />
        </Provider>
    </SafeAreaProvider>
  );
}

export default App;