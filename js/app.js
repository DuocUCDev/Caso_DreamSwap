/*
DreamSwap – app.js (Vanilla JS)
Funcionalidades básicas sin dependencias:
- Router por hash para mostrar secciones
- Manejo de Perfil (localStorage)
- Detalle de sueño -> Agregar al carrito
- Carrito: render, eliminar ítems, total
- Checkout: programar pedido, generar ID y limpiar carrito
- Reseñas: publicar y persistir
- Tracking: consulta simple de estado
*/
(() => {
    const STORAGE_KEY = 'dreamswap_state_v1';

    const initialState = {
        profile: { nombre: '', email: '', rem: '', prefs: []},
        cart: [], // { id, nombre, duracion, intensidad, extras[], subtotal, profile }
        reviews: [], // { producto, rating, comentarios, fecha, profile }
        orders: [] // { id, items[], fecha, hora, metodo, total, profile }
    };

    const localState = () => {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { ...initialState }; }
        catch { return { ...initialState }; }
    }

    const saveState = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    let state = localState();

    // Helpers DOM
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    /* Router por hash */
    const sections = () => $$('main section');
    const showSection = (hash) => {
        const target = hash?.replace('#', '') || 'home';
        sections().forEach(sec => {
            const id = sec.getAttribute('id');
            sec.style.display = (id == target) ? '' : 'none';
        });
    };
    window.addEventListener('hashchange', () => showSection(location.hash));
    document.addEventListener('DOMContentLoaded', () => showSection(location.hash));

    /* Perfil */
    const bindProfile = () => {
        const form = $('#perfil form[aria-label="Perfil"]') || $('perfil form[data-screen=perfil]');
        if (!form) return;

        // Inicializar valores
        $('#nombre', form)?.setAttribute('value', state.profile.nombre || '');
        $('#email', form)?.setAttribute('value', state.profile.email || '');
        $('#rem', form)?.setAttribute('value', state.profile.rem || '');

        const prefInputs = $$('#perfil .form-check-input, #perfil input[name="pref"]');
        prefInputs.forEach(inp => {
            inp.checked = state.profile.prefs?.includes(inp.value) || false;
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            state.profile.nombre = $('#nombre', form)?.value?.trim() || '';
            state.profile.email = $('#email', form)?.value?.trim() || '';
            state.profile.rem = $('#rem', form)?.value?.trim() || '';
            state.profile.prefs = prefInputs.filter(inp => inp.checked).map(i => i.value || i.id);
            saveState();
            toast('Perfil actualizado');
        });
    };

    // Init 
    document.addEventListener('DOMContentLoaded', () => {
        bindProfile();
    });
    
})();