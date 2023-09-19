import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.scss";
import { BrowserRouter } from "react-router-dom";
import { FloatButton } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <div>
      <FloatButton.BackTop type="primary" />
    </div>
  </BrowserRouter>
);
