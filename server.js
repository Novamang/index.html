/* Rasa Bharat – zero-dependency Node.js backend.  Run:  node server.js  */
const http = require('http'), fs = require('fs'), path = require('path');
const Core = require('./core.js');
const PORT = process.env.PORT || 3000;
const DATA = path.join(__dirname, 'data.json');
const PAGES = { '/': 'index.html', '/index.html': 'index.html', '/admin': 'admin.html', '/admin.html': 'admin.html', '/core.js': 'core.js', '/api.js': 'api.js' };
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8' };

let state;
try { state = JSON.parse(fs.readFileSync(DATA, 'utf8')); } catch (e) { state = Core.seed(); save(); }
function save() { fs.writeFileSync(DATA, JSON.stringify(state, null, 2)); }
const publicState = () => { const { adminPassword, ...settings } = state.settings; return { settings, products: state.products }; };
const isAdmin = req => (req.headers['x-admin-key'] || '') === state.settings.adminPassword;
const send = (res, code, obj) => { res.writeHead(code, { 'content-type': 'application/json', 'cache-control': 'no-store' }); res.end(JSON.stringify(obj)); };
const body = req => new Promise((ok, no) => { let b = ''; req.on('data', d => { b += d; if (b.length > 5e6) req.destroy(); }); req.on('end', () => { try { ok(b ? JSON.parse(b) : {}); } catch (e) { no(e); } }); });

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const p = url.pathname;
  try {
    if (p === '/api/state' && req.method === 'GET') return send(res, 200, publicState());
    if (p === '/api/orders' && req.method === 'POST') {
      const order = Core.buildOrder(state, await body(req)); save(); return send(res, 200, order);
    }
    if (p === '/api/coupon' && req.method === 'POST') {
      const b = await body(req); return send(res, 200, Core.calcCoupon(state, Number(b.subtotal) || 0, b.code));
    }
    if (p === '/api/track' && req.method === 'GET') {
      const o = state.orders.find(x => x.id.toUpperCase() === (url.searchParams.get('id') || '').trim().toUpperCase() && x.customer.phone === (url.searchParams.get('phone') || '').trim());
      return o ? send(res, 200, o) : send(res, 404, { error: 'No order found with that ID and phone number.' });
    }
    if (p === '/api/admin/state') {
      if (!isAdmin(req)) return send(res, 401, { error: 'Wrong password' });
      if (req.method === 'GET') return send(res, 200, state);
      if (req.method === 'PUT') { const b = await body(req); if (!b.settings || !b.products || !b.orders || !b.coupons) return send(res, 400, { error: 'Bad data' }); state = b; save(); return send(res, 200, { ok: true }); }
    }
    if (PAGES[p]) {
      const f = PAGES[p];
      res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'text/plain' });
      return res.end(fs.readFileSync(path.join(__dirname, f)));
    }
    res.writeHead(404); res.end('Not found');
  } catch (e) { send(res, 400, { error: e.message || 'Something went wrong' }); }
}).listen(PORT, () => {
  console.log('\n🥭 Rasa Bharat is running!\n   Store : http://localhost:' + PORT + '\n   Admin : http://localhost:' + PORT + '/admin   (default password: admin123)\n');
});
