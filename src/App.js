import React from 'react';
import store from './store/configStore';
import { Provider } from 'react-redux';
import Main from './containers/main';

function App() {
  return (
    <Provider store={store}>
      <Main></Main>
    </Provider>
  );
}

export default App;
