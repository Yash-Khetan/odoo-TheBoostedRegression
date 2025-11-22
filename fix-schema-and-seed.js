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

async function fixAndSeed() {
  try {
    console.log('Checking and fixing database schema...\n');

    // Check if status column exists in receipts
    const receiptsSchema = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'receipts' AND column_name = 'status'
    `);

    if (receiptsSchema.rows.length === 0) {
      console.log('Adding status column to receipts table...');
      await pool.query(`
        ALTER TABLE receipts 
        ADD COLUMN status VARCHAR(20) DEFAULT 'draft'
      `);
    }

    // Check if status column exists in deliveries
    const deliveriesSchema = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'deliveries' AND column_name = 'status'
    `);

    if (deliveriesSchema.rows.length === 0) {
      console.log('Adding status column to deliveries table...');
      await pool.query(`
        ALTER TABLE deliveries 
        ADD COLUMN status VARCHAR(20) DEFAULT 'draft'
      `);
    }

    console.log('\n✅ Schema check completed!\n');

    // Now seed data
    console.log('Starting data seeding...\n');

    // Check current counts
    const receiptsCount = await pool.query('SELECT COUNT(*) FROM receipts');
    const deliveriesCount = await pool.query('SELECT COUNT(*) FROM deliveries');
    
    console.log('Current data:');
    console.log('- Receipts:', receiptsCount.rows[0].count);
    console.log('- Deliveries:', deliveriesCount.rows[0].count);
    console.log('\nAdding more data...\n');

    // Add more receipts with proper status
    const suppliers = [
      'Tech Components Ltd', 'Global Supplies Inc', 'Quality Parts Co',
      'Industrial Materials Corp', 'Premier Distributors', 'Mega Wholesale Ltd',
      'Prime Vendors Inc', 'Elite Suppliers Co', 'Top Tier Materials',
      'Advanced Components Ltd'
    ];

    const statuses = ['draft', 'waiting', 'ready', 'done'];

    // Get first product and warehouse for dummy values
    const firstProduct = await pool.query('SELECT product_id FROM products LIMIT 1');
    const firstWarehouse = await pool.query('SELECT warehouse_id FROM warehouses LIMIT 1');
    
    if (firstProduct.rows.length === 0 || firstWarehouse.rows.length === 0) {
      console.log('⚠️  No products or warehouses found. Please seed products first.');
      await pool.end();
      return;
    }

    const defaultProductId = firstProduct.rows[0].product_id;
    const defaultWarehouseId = firstWarehouse.rows[0].warehouse_id;

    for (let i = 0; i < 20; i++) {
      const supplier = suppliers[i % suppliers.length];
      const daysAgo = Math.floor(Math.random() * 90);
      const receiptDate = new Date();
      receiptDate.setDate(receiptDate.getDate() - daysAgo);
      
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const quantity = Math.floor(Math.random() * 100) + 10;
      
      await pool.query(
        `INSERT INTO receipts (product_id, warehouse_id, quantity, supplier_name, receipt_date, reference_number, status, notes, created_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [defaultProductId, defaultWarehouseId, quantity, supplier, receiptDate, `PO-2025-${1000 + i}`, status, `Purchase order from ${supplier}`, 1]
      );
    }

    // Add more deliveries with proper status
    const customers = [
      'ABC Corporation', 'XYZ Industries', 'Metro Retail Chain',
      'Downtown Store', 'Uptown Mall', 'City Center Shop',
      'Suburban Outlet', 'Regional Distributor', 'National Chain Co',
      'Local Business Ltd', 'Enterprise Solutions', 'Mega Mart',
      'Quick Shop', 'Express Delivery Co', 'Fast Track Ltd'
    ];

    for (let i = 0; i < 30; i++) {
      const customer = customers[i % customers.length];
      const daysAgo = Math.floor(Math.random() * 60);
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() - daysAgo);
      
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const quantity = Math.floor(Math.random() * 50) + 5;
      
      await pool.query(
        `INSERT INTO deliveries (product_id, warehouse_id, quantity, customer_name, delivery_date, reference_number, status, notes, created_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [defaultProductId, defaultWarehouseId, quantity, customer, deliveryDate, `SO-2025-${2000 + i}`, status, `Sales order for ${customer}`, 1]
      );
    }

    // Get products and locations
    const products = await pool.query('SELECT product_id FROM products');
    const locations = await pool.query('SELECT id FROM locations LIMIT 20');

    if (products.rows.length === 0 || locations.rows.length === 0) {
      console.log('⚠️  Warning: No products or locations found. Skipping items creation.');
    } else {
      // Add receipt items for some receipts
      const receipts = await pool.query('SELECT receipt_id FROM receipts ORDER BY receipt_id DESC LIMIT 15');

      for (const receipt of receipts.rows) {
        const itemCount = Math.floor(Math.random() * 4) + 1;
        for (let i = 0; i < itemCount; i++) {
          const product = products.rows[Math.floor(Math.random() * products.rows.length)];
          const location = locations.rows[Math.floor(Math.random() * locations.rows.length)];
          const qty = Math.floor(Math.random() * 100) + 10;
          
          try {
            await pool.query(
              `INSERT INTO receipt_items (receipt_id, product_id, location_id, qty)
               VALUES ($1, $2, $3, $4)`,
              [receipt.receipt_id, product.product_id, location.id, qty]
            );
          } catch (err) {
            // Skip if duplicate
            if (!err.message.includes('duplicate')) {
              console.error('Error adding receipt item:', err.message);
            }
          }
        }
      }

      // Add delivery items for some deliveries
      const deliveries = await pool.query('SELECT delivery_id FROM deliveries ORDER BY delivery_id DESC LIMIT 20');

      for (const delivery of deliveries.rows) {
        const itemCount = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < itemCount; i++) {
          const product = products.rows[Math.floor(Math.random() * products.rows.length)];
          const location = locations.rows[Math.floor(Math.random() * locations.rows.length)];
          const qty = Math.floor(Math.random() * 50) + 5;
          
          try {
            await pool.query(
              `INSERT INTO delivery_items (delivery_id, product_id, location_id, qty)
               VALUES ($1, $2, $3, $4)`,
              [delivery.delivery_id, product.product_id, location.id, qty]
            );
          } catch (err) {
            // Skip if duplicate
            if (!err.message.includes('duplicate')) {
              console.error('Error adding delivery item:', err.message);
            }
          }
        }
      }
    }

    // Final counts
    const finalReceiptsCount = await pool.query('SELECT COUNT(*) FROM receipts');
    const finalDeliveriesCount = await pool.query('SELECT COUNT(*) FROM deliveries');
    const finalReceiptItemsCount = await pool.query('SELECT COUNT(*) FROM receipt_items');
    const finalDeliveryItemsCount = await pool.query('SELECT COUNT(*) FROM delivery_items');

    console.log('\n✅ Data seeding completed!');
    console.log('\nFinal counts:');
    console.log('- Receipts:', finalReceiptsCount.rows[0].count);
    console.log('- Deliveries:', finalDeliveriesCount.rows[0].count);
    console.log('- Receipt Items:', finalReceiptItemsCount.rows[0].count);
    console.log('- Delivery Items:', finalDeliveryItemsCount.rows[0].count);

    await pool.end();
  } catch (err) {
    console.error('❌ Error:', err.message);
    await pool.end();
    process.exit(1);
  }
}

fixAndSeed();
