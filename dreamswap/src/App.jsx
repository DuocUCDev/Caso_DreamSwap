import AppNavbar from './components/layout/Navbar.jsx';
import AppFooter from './components/layout/Footer.jsx';
import './styles/theme.css';

export default function App({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <main className="flex-fill container my-4">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}