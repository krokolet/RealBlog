import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import App from './App';
import './index.scss';
import store from './store/confirgureStore';

ReactDOM.render(
  <ErrorBoundary message="Oops! Something went wrong!">
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);
