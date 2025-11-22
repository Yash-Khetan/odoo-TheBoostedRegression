import pool from "./config/db.js";

async function checkSchema() {
  const client = await pool.connect();
  try {
    console.log("🔍 CHECKING DATABASE SCHEMA\n");
    
    // Check products table structure
    console.log("📦 PRODUCTS table columns:");
    const productCols = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'products' 
      ORDER BY ordinal_position
    `);
    console.table(productCols.rows);
    
    // Check inventory table structure
    console.log("\n📊 INVENTORY table columns:");
    const inventoryCols = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'inventory' 
      ORDER BY ordinal_position
    `);
    console.table(inventoryCols.rows);
    
    // Check warehouses table structure
    console.log("\n🏢 WAREHOUSES table columns:");
    const warehouseCols = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'warehouses' 
      ORDER BY ordinal_position
    `);
    console.table(warehouseCols.rows);
    
    // Show actual data
    console.log("\n📦 Actual products data:");
    const products = await client.query('SELECT * FROM products LIMIT 5');
    console.table(products.rows);
    
    console.log("\n📊 Actual inventory data:");
    const inventory = await client.query('SELECT * FROM inventory LIMIT 5');
    console.table(inventory.rows);
    
    console.log("\n🏢 Actual warehouses data:");
    const warehouses = await client.query('SELECT * FROM warehouses LIMIT 5');
    console.table(warehouses.rows);
    
  } catch (err) {
    console.error("\n❌ ERROR:", err.message);
  } finally {
    client.release();
    process.exit(0);
  }
}

checkSchema();
