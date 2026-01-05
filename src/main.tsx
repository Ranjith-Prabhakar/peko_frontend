import { createRoot } from 'react-dom/client'
import './styles/style.css'
import AppRouter from './routes/AppRouter';

(async () => {
  createRoot(document.getElementById("root")!).render(
     <AppRouter />
  );
})();
