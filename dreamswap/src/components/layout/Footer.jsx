import { useExchangeRates } from '../../hooks/useExchangeRates';

export default function AppFooter() {
    const { usd, uf, loading, error } = useExchangeRates();

    return (
        <footer className="mt-auto py-3 bg-dark border-top text-secondary">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <small>© 2025 DreamSwap</small>
                    <ul className="nav mb-0">
                        <li className="nav-item"><a className="nav-link px-2" href="#">Términos</a></li>
                        <li className="nav-item"><a className="nav-link px-2" href="#">Privacidad</a></li>
                        <li className="nav-item"><a className="nav-link px-2" href="#/estado">Estado Pedido</a></li>
                    </ul>
                </div>
                <div className="text-center small">
                    {loading ? (
                        <span>Cargando valores...</span>
                    ) : error ? (
                        <span className="text-danger">{error}</span>
                    ) : (
                        <span>
                            USD: ${usd.toLocaleString('es-CL', { minimumFractionDigits: 2 })} CLP &nbsp;•&nbsp; 
                            UF: {uf.toLocaleString('es-CL', { minimumFractionDigits: 2 })} CLP
                        </span>
                    )}
                </div>
            </div>
        </footer>
    );
}