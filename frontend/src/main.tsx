import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";
import { AppProviders } from "./providers/AppProviders";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <AppProviders>
    <App />
  </AppProviders>,
);
