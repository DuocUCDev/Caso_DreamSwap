export default function AppFooter() {
    return (
        <footer className="mt-auto py-3 bg-dark border-top text-secondary">
            <div className="container d-flex justify-content-between">
                <small>© 2025 DreamSwap</small>
                <ul className="nav">
                <li className="nav-item"><a className="nav-link px-2" href="#">Términos</a></li>
                <li className="nav-item"><a className="nav-link px-2" href="#">Privacidad</a></li>
                <li className="nav-item"><a className="nav-link px-2" href="#/estado">Estado Pedido</a></li>
                </ul>
            </div>
        </footer>
    );
}