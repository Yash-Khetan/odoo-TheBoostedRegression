import pool from "./config/db.js";

async function checkAdjustments() {
  const client = await pool.connect();
  try {
    console.log("🔍 CHECKING ADJUSTMENTS TABLE\n");
    
    // Check if adjustments table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'adjustments'
      );
    `);
    
    if (!tableCheck.rows[0].exists) {
      console.log("❌ Adjustments table does NOT exist!");
      console.log("\n📋 Creating adjustments table...");
      
      await client.query(`
        CREATE TABLE adjustments (
          adjustment_id SERIAL PRIMARY KEY,
          product_id INTEGER NOT NULL REFERENCES products(product_id),
          warehouse_id INTEGER NOT NULL REFERENCES warehouses(warehouse_id),
          quantity_change INTEGER NOT NULL,
          reason VARCHAR(50) NOT NULL,
          notes TEXT,
          created_by INTEGER REFERENCES users(user_id),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      
      console.log("✅ Adjustments table created successfully!");
    } else {
      console.log("✅ Adjustments table exists!");
      
      // Show table structure
      const cols = await client.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'adjustments' 
        ORDER BY ordinal_position
      `);
      console.log("\n📊 Table structure:");
      console.table(cols.rows);
      
      // Show existing records
      const records = await client.query('SELECT * FROM adjustments ORDER BY created_at DESC LIMIT 5');
      console.log("\n📋 Recent adjustments:");
      if (records.rows.length === 0) {
        console.log("  (No adjustments yet)");
      } else {
        console.table(records.rows);
      }
    }
    
    console.log("\n✅ Check complete!");
    
  } catch (err) {
    console.error("\n❌ ERROR:", err.message);
    console.error(err);
  } finally {
    client.release();
    process.exit(0);
  }
}

checkAdjustments();
