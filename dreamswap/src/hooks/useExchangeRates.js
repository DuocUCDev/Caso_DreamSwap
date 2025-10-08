import { useState, useEffect } from 'react';

export const useExchangeRates = () => {
    const [rates, setRates] = useState({ usd: 0, uf: 0, loading: true, error: null });

    useEffect(() => {
        const fetchRates = async () => {
            try {
                // Usar la API de mindicador.cl que es pública y no requiere autenticación
                const [usdResponse, ufResponse] = await Promise.all([
                    fetch('https://mindicador.cl/api/dolar'),
                    fetch('https://mindicador.cl/api/uf')
                ]);

                const usdData = await usdResponse.json();
                const ufData = await ufResponse.json();

                setRates({
                    usd: usdData.serie[0].valor,
                    uf: ufData.serie[0].valor,
                    loading: false,
                    error: null
                });
            } catch (error) {
                setRates(prev => ({
                    ...prev,
                    loading: false,
                    error: 'Error al cargar los valores'
                }));
            }
        };

        fetchRates();
        
        // Actualizar cada hora
        const interval = setInterval(fetchRates, 3600000);
        return () => clearInterval(interval);
    }, []);

    return rates;
};