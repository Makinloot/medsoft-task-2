import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContextProvider } from "./context/ContextProvider.jsx";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./reducers/index.js";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

// const store = createStore(allReducers);
const store = configureStore({
  reducer: allReducers,
  middleware: [thunk],
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);
