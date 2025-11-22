import pool from "./config/db.js";

async function viewDatabase() {
  const client = await pool.connect();
  try {
    console.log("🔍 VIEWING DATABASE CONTENTS\n");
    console.log("=" .repeat(80));
    
    // View all tables
    console.log("\n📊 TABLES IN DATABASE:");
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    tablesResult.rows.forEach(row => console.log(`  ✅ ${row.table_name}`));
    
    // View products
    console.log("\n\n📦 PRODUCTS:");
    console.log("-".repeat(80));
    const products = await client.query('SELECT product_id, name, sku, category, unit_price FROM products ORDER BY product_id');
    console.table(products.rows);
    
    // View warehouses
    console.log("\n🏢 WAREHOUSES:");
    console.log("-".repeat(80));
    const warehouses = await client.query('SELECT warehouse_id, name, location, type FROM warehouses ORDER BY warehouse_id');
    console.table(warehouses.rows);
    
    // View inventory (stock levels)
    console.log("\n📊 INVENTORY (Stock Levels):");
    console.log("-".repeat(80));
    const inventory = await client.query(`
      SELECT 
        i.inventory_id,
        p.name as product,
        w.name as warehouse,
        i.quantity_on_hand,
        i.quantity_reserved,
        i.minimum_stock_level,
        i.maximum_stock_level,
        (i.quantity_on_hand - i.quantity_reserved) as available
      FROM inventory i
      JOIN products p ON i.product_id = p.product_id
      JOIN warehouses w ON i.warehouse_id = w.warehouse_id
      ORDER BY i.inventory_id
    `);
    console.table(inventory.rows);
    
    // Summary statistics
    console.log("\n📈 SUMMARY STATISTICS:");
    console.log("-".repeat(80));
    const stats = await client.query(`
      SELECT 
        COUNT(DISTINCT product_id) as total_products,
        COUNT(DISTINCT warehouse_id) as total_warehouses,
        COUNT(*) as total_inventory_records,
        SUM(quantity_on_hand) as total_items_in_stock,
        SUM(quantity_reserved) as total_reserved,
        COUNT(CASE WHEN quantity_on_hand = 0 THEN 1 END) as out_of_stock_count,
        COUNT(CASE WHEN quantity_on_hand > 0 AND quantity_on_hand <= minimum_stock_level THEN 1 END) as low_stock_count
      FROM inventory
    `);
    console.table(stats.rows);
    
    // Stock value
    console.log("\n💰 TOTAL STOCK VALUE:");
    console.log("-".repeat(80));
    const value = await client.query(`
      SELECT 
        SUM(i.quantity_on_hand * p.unit_price) as total_stock_value,
        SUM((i.quantity_on_hand - i.quantity_reserved) * p.unit_price) as available_stock_value
      FROM inventory i
      JOIN products p ON i.product_id = p.product_id
    `);
    console.log(`  Total Stock Value: ₹${parseFloat(value.rows[0].total_stock_value).toFixed(2)}`);
    console.log(`  Available Stock Value: ₹${parseFloat(value.rows[0].available_stock_value).toFixed(2)}`);
    
    console.log("\n" + "=".repeat(80));
    console.log("✅ Database view complete!\n");
    
  } catch (err) {
    console.error("\n❌ ERROR:", err.message);
  } finally {
    client.release();
    process.exit(0);
  }
}

viewDatabase();
