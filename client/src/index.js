import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#91d700",
            colorPrimaryHover: "#69cb2f",
            borderRadius : '0px'
          },
        },
        token : {
          borderRadius :'2px',
          colorPrimary: "#91d700",
        }
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);
reportWebVitals();
