import AppNavbar from "./components/layout/Navbar";
import AppFooter from "./components/layout/Footer";
import './styles/theme.css';

export default function App() {
  return (
    <>
      <AppNavbar />
      <main className="container my-4" role="main">
        {/* Aquí irían las rutas y el contenido principal */}
      </main>
      <AppFooter />
    </>
  );
}