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

async function checkWarehouses() {
  try {
    // Get warehouses
    const warehouses = await pool.query('SELECT * FROM warehouses ORDER BY warehouse_id');
    console.log('\n🏢 Warehouses:');
    console.table(warehouses.rows);

    // Get stock per warehouse
    const warehouseStock = await pool.query(`
      SELECT 
        w.warehouse_id,
        w.warehouse_name,
        COUNT(DISTINCT s.product_id) as product_count,
        SUM(s.qty) as total_quantity
      FROM warehouses w
      LEFT JOIN stock s ON w.warehouse_id = s.warehouse_id
      GROUP BY w.warehouse_id, w.warehouse_name
      ORDER BY w.warehouse_id
    `);
    console.log('\n📦 Stock Summary by Warehouse:');
    console.table(warehouseStock.rows);

    // Get locations per warehouse
    const locations = await pool.query(`
      SELECT warehouse_id, COUNT(*) as location_count
      FROM locations
      GROUP BY warehouse_id
      ORDER BY warehouse_id
    `);
    console.log('\n📍 Locations per Warehouse:');
    console.table(locations.rows);

    await pool.end();
  } catch (err) {
    console.error('Error:', err.message);
    await pool.end();
  }
}

checkWarehouses();
