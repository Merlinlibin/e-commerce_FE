import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { BrowserRouter as Router } from 'react-router-dom';
import store from "./reducers/store.jsx";
import { AppProvider } from "./context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>
  </Provider>
);