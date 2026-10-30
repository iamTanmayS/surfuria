import { BrowserRouter as Router } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';
import AppRoutes from './app/router';
import './styles/global.css';

export default function App() {
  return (
    <Router>
      <SiteLayout>
        <AppRoutes />
      </SiteLayout>
    </Router>
  );
}
