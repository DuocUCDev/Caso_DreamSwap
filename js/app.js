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
    profile: { nombre: '', email: '', rem: '', prefs: [] },
    cart: [], // { id, nombre, duracion, intensidad, extras[], subtotal }
    reviews: [], // { producto, rating, comentario, fecha }
    orders: [] // { id, items[], fecha, hora, metodo, total }
  };

  const loadState = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { ...initialState }; }
    catch { return { ...initialState }; }
  };
  const saveState = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  let state = loadState();

  // Helpers DOM
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ==========================
  // Router por hash
  // ==========================
  const sections = () => $$('main section');
  const showSection = (hash) => {
    const target = hash?.replace('#', '') || 'home';
    sections().forEach(sec => {
      const id = sec.getAttribute('id');
      sec.style.display = (id === target) ? '' : 'none';
    });
  };
  window.addEventListener('hashchange', () => showSection(location.hash));
  document.addEventListener('DOMContentLoaded', () => showSection(location.hash));

  // ==========================
  // Perfil
  // ==========================
  const bindProfile = () => {
    const form = $('#perfil form[aria-label="Perfil"]') || $('#perfil form[data-screen="perfil"]');
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
      state.profile.prefs = prefInputs.filter(i => i.checked).map(i => i.value || i.id);
      saveState();
      toast('Perfil actualizado');
    });
  };

  // ==========================
  // Detalle -> Agregar al carrito
  // ==========================
  const priceCalc = ({ duracion = 30, extras = [] } = {}) => {
    // Precio base simple en CR (Créditos REM)
    const base = 12; // precio base
    const byDuration = Math.ceil(duracion / 15) * 3; // 3 CR por cada 15 min
    const byExtras = (extras?.length || 0) * 2; // 2 CR por extra
    return base + byDuration + byExtras;
  };

  const bindDetail = () => {
    const form = $('#detalle-sueno form[aria-label="Personalización del sueño"], #detalle-sueno form[data-screen="detalle-config"]');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = $('#detalle-sueno h2, #detalle-sueno h3')?.textContent?.trim() || 'Sueño personalizado';
      const idAttr = $('#detalle-sueno article')?.dataset?.id || 'DS101';
      const duracion = parseInt($('#duracion-detalle')?.value || 30, 10);
      const intensidad = $('#intensidad-detalle')?.value || 'Media';
      const extrasSel = $('#extras');
      const extras = extrasSel ? Array.from(extrasSel.selectedOptions).map(o => o.value) : [];
      const subtotal = priceCalc({ duracion, extras });

      state.cart.push({ id: idAttr, nombre, duracion, intensidad, extras, subtotal });
      saveState();
      renderCart();
      location.hash = '#carrito';
      toast('Añadido al carrito');
    });
  };

  // ==========================
  // Carrito
  // ==========================
  const renderCart = () => {
    const tbody = $('#carrito tbody');
    const tfootTotalCell = $('#carrito tfoot td:nth-child(2), #carrito tfoot td:last-child');
    if (!tbody) return;

    if (!state.cart.length) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center">Tu carrito está vacío</td></tr>`;
      if (tfootTotalCell) tfootTotalCell.textContent = '0 CR';
      return;
    }

    tbody.innerHTML = state.cart.map((it, idx) => `
      <tr data-index="${idx}">
        <td>${escapeHTML(it.nombre)}</td>
        <td>${it.duracion} min</td>
        <td>${escapeHTML(it.intensidad)}</td>
        <td>${it.extras.map(escapeHTML).join(', ') || '—'}</td>
        <td>${it.subtotal} CR</td>
        <td>
          <button class="btn btn-sm btn-outline-light" data-action="delete" data-index="${idx}">Eliminar</button>
        </td>
      </tr>
    `).join('');

    const total = state.cart.reduce((s, it) => s + it.subtotal, 0);
    const totalCell = $('#carrito tfoot td:nth-last-child(2)');
    if (totalCell) totalCell.textContent = `${total} CR`;

    tbody.addEventListener('click', (ev) => {
      const btn = ev.target.closest('[data-action="delete"]');
      if (!btn) return;
      const idx = parseInt(btn.dataset.index, 10);
      state.cart.splice(idx, 1);
      saveState();
      renderCart();
    }, { once: true });
  };

  // ==========================
  // Checkout
  // ==========================
  const bindCheckout = () => {
    const form = $('#checkout form[aria-label="Checkout"], #checkout form[data-screen="checkout"]');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!state.cart.length) { toast('Tu carrito está vacío'); return; }

      const fecha = $('#fecha', form)?.value || '';
      const hora = $('#hora', form)?.value || '';
      const metodo = $('#metodo', form)?.value || 'Créditos REM';
      if (!fecha || !hora) { toast('Selecciona fecha y hora'); return; }

      const total = state.cart.reduce((s, it) => s + it.subtotal, 0);
      const orderId = `DS-${Date.now()}`;
      state.orders.push({ id: orderId, items: [...state.cart], fecha, hora, metodo, total });
      state.cart = [];
      saveState();
      renderCart();

      // Llevar a tracking con el ID rellenado
      const input = $('#estado-pedido #pedido-id');
      if (input) input.value = orderId;
      location.hash = '#estado-pedido';
      renderTracking();
      toast('¡Pedido confirmado!');
    });
  };

  // ==========================
  // Reseñas
  // ==========================
  const bindReviews = () => {
    const form = $('#resenas form[aria-label="Enviar reseña"], #resenas form[data-screen="resenas"]');
    const list = $('#resenas .lista-resenas, #resenas .list-unstyled');
    if (!form || !list) return;

    const render = () => {
      list.innerHTML = state.reviews.map(r => `
        <li><strong>${escapeHTML(r.producto)}</strong> – ${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)} – ${escapeHTML(r.comentario)}</li>
      `).join('');
    };

    render();

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const producto = $('#producto', form)?.value?.trim() || 'Sueño';
      const ratingVal = ($('#rating', form)?.value || '★★★★★').replace(/[^★]/g, '').length || 5;
      const comentario = $('#comentario', form)?.value?.trim() || '';
      state.reviews.unshift({ producto, rating: ratingVal, comentario, fecha: new Date().toISOString() });
      saveState();
      render();
      form.reset();
      toast('¡Gracias por tu reseña!');
    });
  };

  // ==========================
  // Tracking
  // ==========================
  const bindTracking = () => {
    const form = $('#estado-pedido form[aria-label="Buscar pedido"], #estado-pedido form[data-screen="tracking"]');
    if (!form) return;
    form.addEventListener('submit', (e) => { e.preventDefault(); renderTracking(); });
  };

  const renderTracking = () => {
    const id = $('#estado-pedido #pedido-id')?.value?.trim();
    const steps = $('#estado-pedido .progreso') || $('#estado-pedido ol.list-group');
    if (!steps) return;

    const order = state.orders.find(o => o.id === id);
    const base = [ 'Preparando tu sueño', 'Sincronizando con tu ciclo REM', 'Listo para iniciar' ];
    const out = order ? base : [ 'Pedido no encontrado', 'Si confirmaste recientemente, intenta de nuevo', '—' ];

    if (steps.classList.contains('progreso')) {
      steps.innerHTML = out.map(t => `<li>${escapeHTML(t)}</li>`).join('');
    } else {
      // list-group
      steps.innerHTML = out.map((t, i, a) => `
        <li class="list-group-item bg-transparent text-white border-0 ${i < a.length-1 ? 'border-bottom' : ''}">${escapeHTML(t)}</li>
      `).join('');
    }
  };

  // ==========================
  // Utilidades
  // ==========================
  const escapeHTML = (str='') => str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[m]));

  const toast = (msg) => {
    // Toast simple, no depende de Bootstrap JS.
    const el = document.createElement('div');
    el.textContent = msg;
    Object.assign(el.style, {
      position:'fixed', inset:'auto 1rem 1rem auto', background:'#121823', color:'#e6ecf2',
      border:'1px solid #243042', padding:'.6rem .8rem', borderRadius:'10px', zIndex:9999,
      boxShadow:'0 8px 24px rgba(0,0,0,.35)'
    });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2400);
  };

  // ==========================
  // Init
  // ==========================
  document.addEventListener('DOMContentLoaded', () => {
    bindProfile();
    bindDetail();
    renderCart();
    bindCheckout();
    bindReviews();
    bindTracking();
  });
})();
