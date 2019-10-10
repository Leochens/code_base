import React from 'react';
import store from './store/configStore';
import { Provider } from 'react-redux';
import Main from './containers/main';
import Test from './containers/test';
function App() {
  return (
    <Provider store={store}>
      <Main></Main>
      {/* <Test></Test> */}
    </Provider>
  );
}

export default App;
