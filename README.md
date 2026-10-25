Rasa Bharat – Indian Juice Store (Store + Admin Panel + Backend)
Files
File	What it is
`index.html`	Customer storefront (shop, cart, checkout, order tracking)
`admin.html`	Admin panel – you run the whole store from here
`server.js`	Backend (Node.js, no packages needed). Saves everything in `data.json`
`core.js`, `api.js`	Shared logic / data layer used by both pages and the server
Run it (recommended – real backend)
Install Node.js (https://nodejs.org) – any version 16+.
Put all files in one folder, open a terminal there and run:
```
   node server.js
   ```
Open:
Store: http://localhost:3000
Admin: http://localhost:3000/admin  (default password admin123 – change it in Settings)
Orders placed on the store appear in the admin panel within ~15 seconds. Data is stored in `data.json` (back it up from Settings → Backup).
Quick preview (no Node)
Double-click `index.html` and `admin.html`. They fall back to browser storage, so it works on one device/browser only (use Chrome). Use the Node server for a real shop.
Admin panel can
Dashboard: revenue, orders, 7-day sales chart, top sellers, low-stock alerts
Products: add / edit / delete, quick stock edit, show/hide, emoji or image URL, badges, colours
Orders: search, filter, change status (customer sees it in Track Order), invoice print, WhatsApp the customer, CSV export, auto stock restore on cancel
Coupons: percent or flat, minimum order, on/off
Settings: brand, hero text, announcement bar, delivery fee, free-delivery limit, UPI, WhatsApp, contact, categories, open/close store, password, backup/restore
Going live on the internet
Host the folder on any Node host (Render, Railway, a VPS) with start command `node server.js`. Payment is Cash/UPI on delivery; an online gateway (Razorpay etc.) can be added later.
