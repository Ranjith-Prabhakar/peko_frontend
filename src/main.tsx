import { createRoot } from "react-dom/client";
import "./styles/style.css";
import AppRouter from "./routes/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store";
import { ensureAccessToken } from "./utils/authToken";
import ErrorBoundary from "./components/common/ErrorBoundary";
import SocketProvider from "./providers/SocketProvider";

(async () => {
  console.log( import.meta.env.VITE_API_BASE_URL as string)
  await ensureAccessToken();
  createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <SocketProvider />
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </Provider>
  );
})();
