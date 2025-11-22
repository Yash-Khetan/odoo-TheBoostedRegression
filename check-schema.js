import pool from "./config/db.js";

async function checkSchema() {
  const client = await pool.connect();
  try {
    console.log("🔍 CHECKING DATABASE SCHEMA\n");
    
    // Check receipts table structure
    console.log("📦 RECEIPTS table columns:");
    const receiptCols = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'receipts' 
      ORDER BY ordinal_position
    `);
    console.table(receiptCols.rows);
    
    // Check deliveries table structure
    console.log("\n📦 DELIVERIES table columns:");
    const deliveryCols = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'deliveries' 
      ORDER BY ordinal_position
    `);
    console.table(deliveryCols.rows);
    
    // Check counts
    const receiptCount = await client.query('SELECT COUNT(*) FROM receipts');
    const deliveryCount = await client.query('SELECT COUNT(*) FROM deliveries');
    const receiptItemsCount = await client.query('SELECT COUNT(*) FROM receipt_items');
    const deliveryItemsCount = await client.query('SELECT COUNT(*) FROM delivery_items');
    
    console.log("\n📊 Current counts:");
    console.log(`- Receipts: ${receiptCount.rows[0].count}`);
    console.log(`- Deliveries: ${deliveryCount.rows[0].count}`);
    console.log(`- Receipt Items: ${receiptItemsCount.rows[0].count}`);
    console.log(`- Delivery Items: ${deliveryItemsCount.rows[0].count}`);
    
  } catch (err) {
    console.error("\n❌ ERROR:", err.message);
  } finally {
    client.release();
    process.exit(0);
  }
}

checkSchema();
