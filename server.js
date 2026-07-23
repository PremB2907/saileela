const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const db = require('./config/db');
const { initCronJobs } = require('./config/cron');

const indexRoutes = require('./routes/indexRoutes');
const passRoutes = require('./routes/passRoutes');
const donationRoutes = require('./routes/donationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure directories exist
['views', 'public', 'receipts', 'logs', 'modules'].forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Mount Routes
app.use('/', indexRoutes);
app.use('/', passRoutes);
app.use('/', donationRoutes);
app.use('/', adminRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).send(`
    <div style="font-family: sans-serif; padding: 40px; text-align: center;">
      <h2>Om Sai Ram - Server Encountered an Unexpected Issue</h2>
      <p style="color: #64748b;">${err.message}</p>
      <a href="/" style="display: inline-block; margin-top: 15px; background: #0F172A; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px;">Return to Home</a>
    </div>
  `);
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render('index', {
    title: '404 - Page Not Found | Shri Saileela Palkhi',
    activeTab: 'home',
    yatraStatus: db.getYatraStatus(),
    scheduleData: []
  });
});

// Start Server & Database
app.listen(PORT, async () => {
  console.log(`=======================================================`);
  console.log(`🚩 Shri Saileela Palkhi Web Server Started`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`=======================================================`);
  
  await db.initDB();
  initCronJobs();
});
