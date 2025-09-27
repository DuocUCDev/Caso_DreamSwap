import AppNavbar from './components/layout/Navbar.jsx';
import AppFooter from './components/layout/Footer.jsx';
import './styles/theme.css';

export default function App({ children }) {
  return (
    <>
      <AppNavbar />
      <main className="container my-4">{children}</main>
      <AppFooter />
    </>
  );
}