/* Rasa Bharat – shared business logic (used by the browser AND the Node server) */
(function (root) {
  function seed() {
    const now = Date.now(), day = 86400000;
    // P(id, name, category, price, mrp, stock, emoji, liquidColor, size, badge, rating, desc, shape, labelText)
    const P = (id, name, category, price, mrp, stock, emoji, color, size, badge, rating, desc, shape, label) =>
      ({ id, name, category, price, mrp, stock, emoji, color, image: '', size, badge, rating, desc, shape, label, active: true });
    const products = [
      P('p1', 'Maaza Mango', 'Mango Drinks', 40, 45, 120, '🥭', '#FFA500', '600 ml', 'Bestseller', 4.9, 'Thick, sweet Indian mango drink. Best served ice cold!', 'pet', 'MAAZA'),
      P('p2', 'Slice Mango', 'Mango Drinks', 40, 45, 100, '🥭', '#FFB300', '600 ml', 'Summer Fav', 4.8, 'Juicy mango taste in a big bottle, perfect for sharing.', 'pet', 'SLICE'),
      P('p3', 'Frooti Mango', 'Mango Drinks', 20, 22, 150, '🥭', '#FFC21A', '200 ml', 'Lunchbox', 4.8, 'The classic mango pack everyone grew up with.', 'tetra', 'FROOTI'),
      P('p4', 'Paper Boat Aamras', 'Mango Drinks', 35, 40, 60, '🥭', '#F59E0B', '250 ml', '', 4.7, 'Thick aamras-style mango drink with a homemade taste.', 'tetra', 'AAMRAS'),
      P('p5', 'Thums Up', 'Cola & Sodas', 40, 45, 140, '🥤', '#4A2511', '750 ml', 'Strong Taste', 4.9, 'Bold, fizzy and strong — India’s favourite cola.', 'pet', 'THUMS UP'),
      P('p6', 'Coca-Cola', 'Cola & Sodas', 40, 45, 130, '🥤', '#D81F26', '750 ml', '', 4.8, 'The ice-cold classic. Great with pizza and parties.', 'pet', 'COCA-COLA'),
      P('p7', 'Pepsi', 'Cola & Sodas', 40, 45, 110, '🥤', '#1F4FA3', '750 ml', '', 4.7, 'Crisp, refreshing cola with a bold fizz.', 'pet', 'PEPSI'),
      P('p8', 'Sprite', 'Cola & Sodas', 40, 45, 100, '🍋', '#35B558', '750 ml', 'Clear & Cool', 4.8, 'Lemon-lime freshness. Instant cooling!', 'pet', 'SPRITE'),
      P('p9', 'Fanta Orange', 'Cola & Sodas', 40, 45, 90, '🍊', '#FF7A00', '750 ml', '', 4.6, 'Bright, bubbly orange fizz for all ages.', 'pet', 'FANTA'),
      P('p10', 'Limca', 'Cola & Sodas', 40, 45, 80, '🍋', '#B5D334', '750 ml', 'Desi Fav', 4.7, 'Lemony, tangy and super refreshing — a true Indian classic.', 'pet', 'LIMCA'),
      P('p11', '7UP', 'Cola & Sodas', 40, 45, 70, '🍋', '#4CC36A', '750 ml', '', 4.5, 'Light lemon-lime fizz with a clean taste.', 'pet', '7UP'),
      P('p12', 'Mountain Dew', 'Cola & Sodas', 40, 45, 75, '🥤', '#C6E22B', '750 ml', 'Energetic', 4.6, 'Citrus kick that keeps you going.', 'pet', 'DEW'),
      P('p13', 'Appy Fizz', 'Cola & Sodas', 25, 30, 90, '🍎', '#D9A441', '250 ml', 'Sparkling', 4.7, 'Sparkling apple drink in a cute glass bottle.', 'glass', 'APPY FIZZ'),
      P('p14', 'Tropicana Orange', 'Fruit Juices', 110, 125, 50, '🍊', '#FF8A00', '1 L', '', 4.6, 'Smooth orange juice with the taste of real fruit.', 'tetra', 'ORANGE'),
      P('p15', 'Real Mixed Fruit', 'Fruit Juices', 115, 130, 45, '🍹', '#E2563B', '1 L', '', 4.6, 'A mix of your favourite fruits in one family pack.', 'tetra', 'MIXED'),
      P('p16', 'Real Guava', 'Fruit Juices', 105, 120, 40, '🍐', '#E87AA0', '1 L', '', 4.5, 'Thick, pink guava juice with a desi taste.', 'tetra', 'GUAVA'),
      P('p17', 'Fresh Mosambi Juice', 'Fruit Juices', 79, 95, 30, '🍊', '#FFA726', '300 ml', 'Fresh', 4.6, 'Cold-pressed sweet lime. No added sugar, no preservatives.', 'pet', 'MOSAMBI'),
      P('p18', 'Fresh Pomegranate Juice', 'Fruit Juices', 119, 140, 24, '🍎', '#B3173F', '250 ml', 'Premium', 4.9, 'Ruby-red anar juice, pressed fresh. Rich in antioxidants.', 'glass', 'ANAR'),
      P('p19', 'Red Bull Energy', 'Energy & Sports', 125, 125, 60, '⚡', '#A9C3E8', '250 ml', '', 4.5, 'Energy drink to power your day or your late night.', 'can', 'RED BULL'),
      P('p20', 'Sting Energy', 'Energy & Sports', 20, 20, 120, '⚡', '#D10F3C', '250 ml', 'Budget Buy', 4.4, 'Berry-flavoured energy drink at a pocket-friendly price.', 'pet', 'STING'),
      P('p21', 'Fresh Coconut Water', 'Desi Coolers', 59, 70, 55, '🥥', '#7FC8A9', '300 ml', 'Hydrating', 4.8, 'Natural coconut water. Nature’s own electrolyte drink.', 'pet', 'COCONUT'),
      P('p22', 'Masala Jaljeera', 'Desi Coolers', 59, 75, 50, '🌿', '#6FAE4E', '300 ml', '', 4.7, 'Tangy, spicy and digestive. Cumin, mint and black salt.', 'glass', 'JALJEERA'),
      P('p23', 'Aam Panna', 'Desi Coolers', 69, 85, 45, '🥭', '#9BC53D', '300 ml', 'Summer Fav', 4.8, 'Raw mango cooler with roasted cumin and mint.', 'glass', 'AAM PANNA'),
      P('p24', 'Rose Sharbat', 'Desi Coolers', 65, 80, 35, '🌹', '#F0568C', '300 ml', 'New', 4.6, 'Sweet, cooling rose sharbat — a summer classic.', 'glass', 'GULAB'),
      P('p25', 'Party Pack – 6 Cold Drinks', 'Combo Packs', 229, 270, 25, '🎉', '#E53935', '6 × 750 ml', 'Save 15%', 4.9, 'Thums Up, Sprite, Coca-Cola, Pepsi, Fanta & Limca — one box for the whole party.', 'pet', 'PARTY'),
      P('p26', 'Mango Lovers Pack', 'Combo Packs', 99, 115, 30, '🥭', '#FFA000', '3 bottles', 'Save 14%', 4.8, 'Maaza, Slice and Frooti together. Triple the mango!', 'pet', 'MANGO x3')
    ];
    const mk = (id, ago, name, phone, items, status, pay) => {
      const lines = items.map(([pid, q]) => { const p = products.find(x => x.id === pid); return { id: p.id, name: p.name, emoji: p.emoji, price: p.price, qty: q }; });
      const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
      const delivery = subtotal >= 499 ? 0 : 40;
      const t = new Date(now - ago * day).toISOString();
      return { id, created: t, customer: { name, phone, address: 'Demo address, Mumbai', pincode: '400001', note: '' }, items: lines, subtotal, discount: 0, coupon: '', delivery, total: subtotal + delivery, payment: pay, status, history: [{ status, at: t }] };
    };
    return {
      settings: {
        brand: 'Rasa Bharat',
        tagline: 'Your favourite cold drinks & juices, delivered',
        announcement: '🎉 Use code FRESH10 for 10% off · Free delivery above ₹499',
        heroTitle: 'Chill. Sip.\nRepeat!',
        heroSub: 'Maaza, Thums Up, Slice, Frooti, fresh juices & desi coolers — ice-cold bottles delivered to your door.',
        deliveryFee: 40, freeDeliveryAbove: 499,
        whatsapp: '919999999999', phone: '+91 99999 99999', email: 'hello@rasabharat.in',
        address: 'Mumbai, Maharashtra, India', upi: 'rasabharat@upi',
        categories: ['Mango Drinks', 'Cola & Sodas', 'Fruit Juices', 'Energy & Sports', 'Desi Coolers', 'Combo Packs'],
        storeOpen: true, adminPassword: 'admin123'
      },
      products,
      coupons: [
        { code: 'FRESH10', type: 'percent', value: 10, minOrder: 199, active: true },
        { code: 'WELCOME50', type: 'flat', value: 50, minOrder: 299, active: true }
      ],
      orders: [
        mk('RB10231', 0.2, 'Aarav Sharma', '9876543210', [['p1', 3], ['p5', 2]], 'Placed', 'COD'),
        mk('RB10230', 1, 'Priya Nair', '9812345678', [['p25', 2]], 'Out for delivery', 'UPI'),
        mk('RB10229', 2, 'Rohan Mehta', '9898989898', [['p18', 2], ['p21', 3]], 'Delivered', 'UPI'),
        mk('RB10228', 3, 'Sneha Iyer', '9765432109', [['p8', 4], ['p10', 2]], 'Delivered', 'COD'),
        mk('RB10227', 5, 'Karan Singh', '9123456780', [['p2', 2], ['p3', 4]], 'Delivered', 'COD')
      ]
    };
  }

  function calcCoupon(state, subtotal, code) {
    code = String(code || '').trim().toUpperCase();
    if (!code) return { ok: false, msg: 'Enter a coupon code' };
    const cp = (state.coupons || []).find(c => c.active && c.code.toUpperCase() === code);
    if (!cp) return { ok: false, msg: 'Invalid or expired coupon' };
    if (subtotal < cp.minOrder) return { ok: false, msg: 'Add items worth ₹' + (cp.minOrder - subtotal) + ' more to use ' + cp.code };
    const discount = cp.type === 'percent' ? Math.round(subtotal * cp.value / 100) : Math.min(cp.value, subtotal);
    return { ok: true, code: cp.code, discount, rule: cp, msg: cp.code + ' applied – you save ₹' + discount };
  }

  // Validates, prices, reduces stock and appends the order to state.orders. Throws on problems.
  function buildOrder(state, p) {
    const s = state.settings;
    if (!s.storeOpen) throw new Error('The store is currently closed for orders.');
    const lines = [];
    for (const it of (p.items || [])) {
      const pr = state.products.find(x => x.id === it.id);
      if (!pr || !pr.active) throw new Error('An item in your cart is no longer available.');
      const q = Math.max(1, Math.min(20, parseInt(it.qty) || 1));
      if (pr.stock < q) throw new Error(pr.name + ' has only ' + pr.stock + ' left in stock.');
      lines.push({ id: pr.id, name: pr.name, emoji: pr.emoji, price: pr.price, qty: q });
    }
    if (!lines.length) throw new Error('Your cart is empty.');
    const c = p.customer || {};
    const clean = v => String(v || '').trim().slice(0, 300);
    if (!clean(c.name) || !/^\d{10}$/.test(clean(c.phone)) || !clean(c.address)) throw new Error('Please enter your name, a 10-digit phone number and address.');
    const subtotal = lines.reduce((t, l) => t + l.price * l.qty, 0);
    let discount = 0, coupon = '';
    if (p.coupon) { const r = calcCoupon(state, subtotal, p.coupon); if (r.ok) { discount = r.discount; coupon = r.code; } }
    const delivery = (subtotal - discount) >= s.freeDeliveryAbove ? 0 : s.deliveryFee;
    lines.forEach(l => { state.products.find(x => x.id === l.id).stock -= l.qty; });
    const now = new Date().toISOString();
    let id; do { id = 'RB' + Math.floor(10000 + Math.random() * 89999); } while (state.orders.some(o => o.id === id));
    const order = {
      id, created: now,
      customer: { name: clean(c.name), phone: clean(c.phone), address: clean(c.address), pincode: clean(c.pincode), note: clean(c.note) },
      items: lines, subtotal, discount, coupon, delivery, total: subtotal - discount + delivery,
      payment: p.payment === 'UPI' ? 'UPI' : 'COD', status: 'Placed', history: [{ status: 'Placed', at: now }]
    };
    state.orders.unshift(order);
    return order;
  }

  const api = { seed, calcCoupon, buildOrder };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Core = api;
})(typeof window !== 'undefined' ? window : globalThis);
