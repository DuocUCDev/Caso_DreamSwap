export default function AppFooter() {
    return (
        <footer className="border-top text-secondary py-4 mt-5" role="contentinfo">
            <div className="container d-flex flex-wrap gap-3 justify-content-between">
                <ul className="nav">
                    <li className="nav-item"><a className="nav-link px-2" href="#">Terminos</a></li>
                    <li className="nav-item"><a className="nav-link px-2" href="#">Priviacidad</a></li>
                    <li className="nav-item"><a className="nav-link px-2" href="#/estado">Estado Pedido</a></li>
                </ul>
                <small>© 2025 DreamSwap</small>
            </div>
        </footer>
    );
}