const mysql = require('mysql2/promise');
require('dotenv').config();

// In-memory fallback data store for offline / demo execution
const mockStore = {
  passes: [
    {
      id: 1,
      pass_code: 'SLP-2026-8942',
      full_name: 'Rahul Ramesh Sharma',
      phone: '9876543210',
      email: 'rahul.sharma@example.com',
      age: 34,
      gender: 'Male',
      city: 'Mumbai',
      batch: 'Batch A - Shirdi Main Route',
      emergency_contact: '9876543211',
      id_proof_type: 'Aadhaar Card',
      id_proof_number: 'XXXX-XXXX-4812',
      status: 'Confirmed',
      created_at: new Date('2026-07-20T10:30:00Z')
    },
    {
      id: 2,
      pass_code: 'SLP-2026-9104',
      full_name: 'Priya Sunil Patil',
      phone: '9123456789',
      email: 'priya.patil@example.com',
      age: 28,
      gender: 'Female',
      city: 'Pune',
      batch: 'Batch B - Sangamner Halts',
      emergency_contact: '9123456780',
      id_proof_type: 'PAN Card',
      id_proof_number: 'ABCDE1234F',
      status: 'Confirmed',
      created_at: new Date('2026-07-21T14:15:00Z')
    }
  ],
  donations: [
    {
      id: 1,
      receipt_no: 'SLP-REC-2026-101',
      donor_name: 'Anand V. Deshmukh',
      phone: '9988776655',
      email: 'anand.deshmukh@example.com',
      amount: 5001,
      category: 'Annadan Seva (Mahaprasad)',
      payment_id: 'pay_Mock101Saileela',
      order_id: 'order_Mock101Order',
      pan_number: 'APZPD8923K',
      status: 'SUCCESS',
      created_at: new Date('2026-07-19T09:00:00Z')
    },
    {
      id: 2,
      receipt_no: 'SLP-REC-2026-102',
      donor_name: 'Sunita M. Kulkarni',
      phone: '9876123456',
      email: 'sunita.k@example.com',
      amount: 2100,
      category: 'Medical & Ambulance Seva',
      payment_id: 'pay_Mock102Saileela',
      order_id: 'order_Mock102Order',
      pan_number: 'BKPKS4129L',
      status: 'SUCCESS',
      created_at: new Date('2026-07-22T16:45:00Z')
    }
  ],
  yatra_status: {
    current_day: 4,
    total_days: 11,
    current_location: 'Loni - Sangamner Highway Halt',
    next_location: 'Babaleshwar Temple Ground',
    distance_covered_km: 142,
    total_distance_km: 265,
    active_varkaris: 4850,
    meals_served_today: 12400,
    last_updated: new Date()
  },
  logs: [
    { id: 1, type: 'SYSTEM', message: 'Saileela Palkhi System Initialized', timestamp: new Date() }
  ]
};

let dbPool = null;
let useMock = false;

async function initDB() {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'saileela_palkhi',
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0
    });

    // Test connection
    const conn = await pool.getConnection();
    conn.release();
    dbPool = pool;
    console.log('✅ Connected to MySQL Database successfully.');

    // Create tables if they do not exist
    await createTables(dbPool);
  } catch (err) {
    console.log('⚠️ MySQL connection omitted or unavailable. Running with high-performance In-Memory Data Store.');
    useMock = true;
  }
}

async function createTables(pool) {
  const createPassesTable = `
    CREATE TABLE IF NOT EXISTS passes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      pass_code VARCHAR(50) UNIQUE NOT NULL,
      full_name VARCHAR(100) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      email VARCHAR(100),
      age INT NOT NULL,
      gender VARCHAR(20) NOT NULL,
      city VARCHAR(100) NOT NULL,
      batch VARCHAR(100) NOT NULL,
      emergency_contact VARCHAR(20) NOT NULL,
      id_proof_type VARCHAR(50) NOT NULL,
      id_proof_number VARCHAR(50) NOT NULL,
      status VARCHAR(30) DEFAULT 'Confirmed',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createDonationsTable = `
    CREATE TABLE IF NOT EXISTS donations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      receipt_no VARCHAR(50) UNIQUE NOT NULL,
      donor_name VARCHAR(100) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      email VARCHAR(100),
      amount DECIMAL(10,2) NOT NULL,
      category VARCHAR(100) NOT NULL,
      payment_id VARCHAR(100),
      order_id VARCHAR(100),
      pan_number VARCHAR(20),
      status VARCHAR(30) DEFAULT 'SUCCESS',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createPassesTable);
    await pool.query(createDonationsTable);
    console.log('✅ MySQL schema initialized.');
  } catch (err) {
    console.error('Error creating database tables:', err.message);
  }
}

// Data Access API
module.exports = {
  initDB,
  isMock: () => useMock,
  mockStore,

  async getPasses() {
    if (useMock) return mockStore.passes;
    try {
      const [rows] = await dbPool.query('SELECT * FROM passes ORDER BY created_at DESC');
      return rows;
    } catch (err) {
      return mockStore.passes;
    }
  },

  async getPassByCode(code) {
    if (useMock) {
      return mockStore.passes.find(p => p.pass_code.toUpperCase() === code.toUpperCase());
    }
    try {
      const [rows] = await dbPool.query('SELECT * FROM passes WHERE UPPER(pass_code) = UPPER(?)', [code]);
      return rows[0] || null;
    } catch (err) {
      return mockStore.passes.find(p => p.pass_code.toUpperCase() === code.toUpperCase());
    }
  },

  async getPassByPhone(phone) {
    if (useMock) {
      return mockStore.passes.find(p => p.phone === phone);
    }
    try {
      const [rows] = await dbPool.query('SELECT * FROM passes WHERE phone = ? ORDER BY created_at DESC', [phone]);
      return rows[0] || null;
    } catch (err) {
      return mockStore.passes.find(p => p.phone === phone);
    }
  },

  async createPass(passData) {
    if (useMock) {
      const newPass = {
        id: mockStore.passes.length + 1,
        ...passData,
        created_at: new Date()
      };
      mockStore.passes.unshift(newPass);
      return newPass;
    }
    try {
      const query = `
        INSERT INTO passes (pass_code, full_name, phone, email, age, gender, city, batch, emergency_contact, id_proof_type, id_proof_number, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        passData.pass_code, passData.full_name, passData.phone, passData.email || '',
        passData.age, passData.gender, passData.city, passData.batch,
        passData.emergency_contact, passData.id_proof_type, passData.id_proof_number,
        passData.status || 'Confirmed'
      ];
      const [result] = await dbPool.query(query, values);
      return { id: result.insertId, ...passData, created_at: new Date() };
    } catch (err) {
      console.error('MySQL insert pass error:', err.message);
      const newPass = { id: mockStore.passes.length + 1, ...passData, created_at: new Date() };
      mockStore.passes.unshift(newPass);
      return newPass;
    }
  },

  async getDonations() {
    if (useMock) return mockStore.donations;
    try {
      const [rows] = await dbPool.query('SELECT * FROM donations ORDER BY created_at DESC');
      return rows;
    } catch (err) {
      return mockStore.donations;
    }
  },

  async getDonationByReceipt(receiptNo) {
    if (useMock) {
      return mockStore.donations.find(d => d.receipt_no.toUpperCase() === receiptNo.toUpperCase());
    }
    try {
      const [rows] = await dbPool.query('SELECT * FROM donations WHERE UPPER(receipt_no) = UPPER(?)', [receiptNo]);
      return rows[0] || null;
    } catch (err) {
      return mockStore.donations.find(d => d.receipt_no.toUpperCase() === receiptNo.toUpperCase());
    }
  },

  async createDonation(donationData) {
    if (useMock) {
      const newDonation = {
        id: mockStore.donations.length + 1,
        ...donationData,
        created_at: new Date()
      };
      mockStore.donations.unshift(newDonation);
      return newDonation;
    }
    try {
      const query = `
        INSERT INTO donations (receipt_no, donor_name, phone, email, amount, category, payment_id, order_id, pan_number, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        donationData.receipt_no, donationData.donor_name, donationData.phone, donationData.email || '',
        donationData.amount, donationData.category, donationData.payment_id || '',
        donationData.order_id || '', donationData.pan_number || '', donationData.status || 'SUCCESS'
      ];
      const [result] = await dbPool.query(query, values);
      return { id: result.insertId, ...donationData, created_at: new Date() };
    } catch (err) {
      console.error('MySQL insert donation error:', err.message);
      const newDonation = { id: mockStore.donations.length + 1, ...donationData, created_at: new Date() };
      mockStore.donations.unshift(newDonation);
      return newDonation;
    }
  },

  getYatraStatus() {
    return mockStore.yatra_status;
  },

  addLog(type, message) {
    const log = { id: mockStore.logs.length + 1, type, message, timestamp: new Date() };
    mockStore.logs.unshift(log);
    return log;
  },

  getLogs() {
    return mockStore.logs;
  }
};
