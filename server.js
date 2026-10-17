const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Sample catalogue (specs/prices are illustrative) -> [id, brand, name, color, priceINR, hp, topKmh, kg, fairing, tank, wheel, wheelbase, twinExhaust]
const raw = [
  ['panigale', 'Ducati', 'Panigale V4 R', '#d10a10', 6900000, 218, 299, 172, 1.2, 1.0, 1.0, 1.0, 0],
  ['superleggera', 'Ducati', 'Superleggera V4', '#1c1c1c', 15000000, 234, 320, 152, 1.2, .95, 1.02, 1.0, 0],
  ['sf-v4', 'Ducati', 'Streetfighter V4 S', '#c40a0a', 2700000, 208, 290, 199, .3, 1.05, 1.0, 1.0, 0],
  ['diavel', 'Ducati', 'Diavel V4', '#222831', 2600000, 168, 250, 236, .35, 1.3, 1.08, 1.08, 1],
  ['h2r', 'Kawasaki', 'Ninja H2R', '#0b0b0b', 7990000, 326, 400, 216, 1.15, 1.1, 1.02, 1.0, 0],
  ['h2', 'Kawasaki', 'Ninja H2 SX', '#3fbf2b', 3200000, 228, 330, 238, 1.1, 1.15, 1.0, 1.04, 0],
  ['zx10r', 'Kawasaki', 'ZX-10R', '#58d33a', 1800000, 200, 299, 207, 1.0, 1.0, 1.0, 1.0, 0],
  ['zh2', 'Kawasaki', 'Z H2', '#4b4b50', 2300000, 197, 240, 240, .25, 1.1, 1.0, 1.0, 0],
  ['r1m', 'Yamaha', 'YZF-R1M', '#1550e0', 2600000, 200, 299, 202, 1.0, .95, 1.0, 1.0, 0],
  ['mt10', 'Yamaha', 'MT-10 SP', '#2d6bff', 1700000, 165, 240, 212, .3, 1.0, 1.0, 1.0, 0],
  ['s1000rr', 'BMW', 'S 1000 RR', '#f2f2f2', 2100000, 205, 303, 197, 1.0, 1.05, 1.0, 1.0, 0],
  ['m1000rr', 'BMW', 'M 1000 RR', '#1d4fd7', 3300000, 212, 306, 192, 1.15, 1.05, 1.0, 1.0, 0],
  ['s1000r', 'BMW', 'S 1000 R', '#e8e8ea', 1700000, 165, 250, 199, .3, 1.0, 1.0, 1.0, 0],
  ['fireblade', 'Honda', 'CBR1000RR-R SP', '#e01010', 2800000, 215, 299, 201, 1.1, 1.0, 1.0, 1.0, 0],
  ['hayabusa', 'Suzuki', 'Hayabusa', '#f5a800', 1700000, 187, 299, 264, 1.1, 1.25, 1.03, 1.06, 1],
  ['gsxr', 'Suzuki', 'GSX-R1000R', '#0a4bd8', 2200000, 199, 299, 203, 1.0, 1.0, 1.0, 1.0, 0],
  ['rsv4', 'Aprilia', 'RSV4 Factory', '#111111', 2400000, 217, 300, 202, 1.05, 1.0, 1.0, 1.0, 0],
  ['tuono', 'Aprilia', 'Tuono V4 Factory', '#e63b1f', 2200000, 175, 270, 209, .3, 1.0, 1.0, 1.0, 0],
  ['f4rc', 'MV Agusta', 'F4 RC', '#b11226', 5500000, 208, 299, 190, 1.1, .95, 1.0, 1.0, 1],
  ['daytona', 'Triumph', 'Daytona 765 Moto2', '#f2c200', 1500000, 130, 260, 200, .95, .95, 1.0, 1.0, 0],
  ['speedtriple', 'Triumph', 'Speed Triple 1200 RR', '#8a1c1c', 2200000, 180, 260, 199, .5, 1.0, 1.0, 1.0, 0],
  ['superduke', 'KTM', '1390 Super Duke R', '#ff6a00', 2100000, 190, 270, 200, .25, 1.0, 1.0, 1.0, 0],
  ['rc8c', 'KTM', 'RC 8C', '#ff7a1a', 3500000, 135, 250, 140, .9, .9, 1.0, .96, 0],
  ['v4s', 'Ducati', 'Panigale V2', '#e5e5e8', 1700000, 155, 270, 200, 1.0, .95, 1.0, 1.0, 0]
];
const bikes = raw.map(([id, brand, name, color, price, hp, top, weight, f, t, w, l, x]) =>
  ({ id, brand, name, color, price, hp, top, weight, p: { f, t, w, l, x } }));

app.get('/api/bikes', (req, res) => res.json(bikes));

app.post('/api/enquiry', (req, res) => {
  const { name, phone, bike } = req.body || {};
  if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required' });
  console.log('New enquiry:', { name, phone, bike, at: new Date().toISOString() });
  res.json({ ok: true });
});

app.use('/vendor/three', express.static(path.join(__dirname, 'node_modules/three')));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(process.env.PORT || 3000, () => console.log('Showroom running on port ' + (process.env.PORT || 3000)));
