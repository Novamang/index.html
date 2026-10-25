/* Browser data layer. Uses the Node backend when available, otherwise falls back to localStorage
   (so the pages still work when index.html / admin.html are simply double-clicked). */
const API = {
  mode: 'server',
  _local() {
    try { const s = JSON.parse(localStorage.getItem('rb_state')); if (s && s.products) return s; } catch (e) {}
    const s = Core.seed(); localStorage.setItem('rb_state', JSON.stringify(s)); return s;
  },
  _save(s) { localStorage.setItem('rb_state', JSON.stringify(s)); },
  async _json(r) { const d = await r.json().catch(() => ({})); if (!r.ok) throw new Error(d.error || 'Request failed'); return d; },
  async pub() {
    try {
      const r = await fetch('/api/state', { cache: 'no-store' });
      if (!r.ok) throw 0;
      API.mode = 'server'; return await r.json();
    } catch (e) {
      API.mode = 'local';
      const s = API._local(); const { adminPassword, ...settings } = s.settings;
      return { settings, products: s.products };
    }
  },
  async order(p) {
    if (API.mode === 'server') return API._json(await fetch('/api/orders', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(p) }));
    const s = API._local(); const o = Core.buildOrder(s, p); API._save(s); return o;
  },
  async coupon(code, subtotal) {
    if (API.mode === 'server') return API._json(await fetch('/api/coupon', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ code, subtotal }) }));
    return Core.calcCoupon(API._local(), subtotal, code);
  },
  async track(id, phone) {
    if (API.mode === 'server') return API._json(await fetch('/api/track?id=' + encodeURIComponent(id) + '&phone=' + encodeURIComponent(phone)));
    const o = API._local().orders.find(x => x.id.toUpperCase() === id.trim().toUpperCase() && x.customer.phone === phone.trim());
    if (!o) throw new Error('No order found with that ID and phone number.'); return o;
  },
  async adminGet(key) {
    if (API.mode === 'server') return API._json(await fetch('/api/admin/state', { headers: { 'x-admin-key': key }, cache: 'no-store' }));
    const s = API._local(); if (s.settings.adminPassword !== key) throw new Error('Wrong password'); return s;
  },
  async adminPut(key, s) {
    if (API.mode === 'server') return API._json(await fetch('/api/admin/state', { method: 'PUT', headers: { 'x-admin-key': key, 'content-type': 'application/json' }, body: JSON.stringify(s) }));
    API._save(s);
  },
  // read-modify-write on the freshest data so new customer orders are never overwritten
  async mutate(key, fn) { const s = await API.adminGet(key); fn(s); await API.adminPut(key, s); return s; }
};
