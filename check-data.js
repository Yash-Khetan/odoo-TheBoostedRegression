import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

async function checkData() {
  try {
    const [receipts, deliveries, receiptStatuses, deliveryStatuses] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM receipts'),
      pool.query('SELECT COUNT(*) FROM deliveries'),
      pool.query('SELECT status, COUNT(*) FROM receipts GROUP BY status ORDER BY status'),
      pool.query('SELECT status, COUNT(*) FROM deliveries GROUP BY status ORDER BY status')
    ]);

    console.log('📊 Database Summary:\n');
    console.log('Total Receipts:', receipts.rows[0].count);
    console.log('Total Deliveries:', deliveries.rows[0].count);
    
    console.log('\n📥 Receipt Status Breakdown:');
    receiptStatuses.rows.forEach(row => {
      console.log(`  ${row.status}: ${row.count}`);
    });
    
    console.log('\n📤 Delivery Status Breakdown:');
    deliveryStatuses.rows.forEach(row => {
      console.log(`  ${row.status}: ${row.count}`);
    });

    await pool.end();
  } catch (err) {
    console.error('Error:', err.message);
    await pool.end();
  }
}

checkData();
