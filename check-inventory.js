import pool from "./config/db.js";

async function checkInventory() {
  const client = await pool.connect();
  try {
    console.log("🔍 CHECKING INVENTORY TABLE SCHEMA\n");
    
    const cols = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'inventory' 
      ORDER BY ordinal_position
    `);
    
    console.log("📊 Inventory table columns:");
    console.table(cols.rows);
    
  } catch (err) {
    console.error("\n❌ ERROR:", err.message);
  } finally {
    client.release();
    process.exit(0);
  }
}

checkInventory();
